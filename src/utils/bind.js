const bind = state => ({
  onChange: e => state(e.currentTarget.value),
  value: state(),
});

export default bind;
