import React, { Component } from 'react';
import PropTypes from 'prop-types';

const KEY_ENTER = 'Enter';

const computeCirclePosition = (total, position) => 100 / (total - 1) * position;

const computeCirclePositionFromMousePosition = (mouseX, { left, width }) => (mouseX - left) / width * 100;

const computeChoicesFromOptions = options =>
  options.map(({ label, value }, index) => ({
    label,
    position: computeCirclePosition(options.length, index),
    value,
  }));

const findChoiceByValue = (choices, value) => choices.find(choice => choice.value === value);

const snapBulletPoint = (choices, circlePosition) =>
  choices.reduce(
    (min, choice) => {
      const distance = Math.abs(circlePosition - choice.position);
      return distance < min.distance ? { distance, choice } : min;
    },
    { distance: Infinity, choice: null },
  );

export default class TickSlider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    rootStyle: PropTypes.object,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        value: PropTypes.number,
      }),
    ),
    value: PropTypes.number,
  };

  static defaultProps = {
    rootStyle: {},
    options: [],
    value: null,
  };

  constructor(props) {
    super(props);
    this.slidebarElement = React.createRef();

    const choices = computeChoicesFromOptions(props.options);
    const selectedChoice = findChoiceByValue(choices, props.value);

    this.state = {
      choices,
      selectedChoice,
      isDragging: false,
    };
  }

  componentWillReceiveProps({ options, value }) {
    const newChoices = options ? computeChoicesFromOptions(options) : this.state.choices;
    const newChoice = value ? findChoiceByValue(newChoices, value) : this.state.selectedChoice;

    this.setState({
      choices: newChoices,
      selectedChoice: newChoice,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isDragging && !prevState.isDragging) {
      document.addEventListener('mousemove', this.handleMove);
      document.addEventListener('touchmove', this.handleMove);

      document.addEventListener('mouseup', this.handleStop);
      document.addEventListener('touchend', this.handleStop);
    } else if (!this.state.isDragging && prevState.isDragging) {
      document.removeEventListener('mousemove', this.handleMove);
      document.removeEventListener('touchmove', this.handleMove);

      document.removeEventListener('mouseup', this.handleStop);
      document.removeEventListener('touchend', this.handleStop);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMove);
    document.removeEventListener('touchmove', this.handleMove);

    document.removeEventListener('mouseup', this.handleStop);
    document.removeEventListener('touchend', this.handleStop);
  }

  selectChoice = choice => {
    const { selectedChoice } = this.state;

    if (!selectedChoice || selectedChoice.value !== choice.value) {
      this.setState({ selectedChoice: choice });
    }
  };

  handleStop = e => {
    const { choices, isDragging } = this.state;

    if (!isDragging) {
      return;
    }

    const slidebar = this.slidebarElement.current.getBoundingClientRect();
    const circlePosition = computeCirclePositionFromMousePosition(e.pageX || e.changedTouches[0].pageX, slidebar);
    const snappedBulletPoint = snapBulletPoint(choices, circlePosition);

    this.selectChoice(snappedBulletPoint.choice);
    this.setState({ isDragging: false });
  };

  handleMove = e => {
    const { choices, isDragging } = this.state;

    if (!isDragging) {
      return;
    }

    const slidebar = this.slidebarElement.current.getBoundingClientRect();
    const circlePosition = computeCirclePositionFromMousePosition(e.pageX || e.changedTouches[0].pageX, slidebar);
    const snappedBulletPoint = snapBulletPoint(choices, circlePosition);

    this.selectChoice(snappedBulletPoint.choice);
  };

  handleStart = () => {
    this.setState({ isDragging: true });
  };

  handleKeyPress = choice => e => {
    if (e.key === KEY_ENTER) {
      this.selectChoice(choice);
    }
  };

  render() {
    const { choices, selectedChoice } = this.state;
    const { children, rootStyle } = this.props;

    return (
      <div style={rootStyle} ref={this.slidebarElement}>
        {children({
          handleStart: this.handleStart,
          handleKeyPress: this.handleKeyPress,
          selectedChoice,
          choices,
        })}
      </div>
    );
  }
}
