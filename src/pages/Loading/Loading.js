import "./Loading.css";
const Loading = (props) => {
  return (
    <div className="loading">
      <div className="container_loading">
        <div className="circle"></div>
        {props.error ? <h2>{props.error}</h2> : <h2>Loading...</h2>}
      </div>
    </div>
  );
};

export default Loading;
