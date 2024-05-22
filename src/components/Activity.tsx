type activityProp = {
  sessions: number;
};

const Activity = (props: activityProp) => {
  return <h1>Work Sessions: {props.sessions}</h1>;
};

export default Activity;
