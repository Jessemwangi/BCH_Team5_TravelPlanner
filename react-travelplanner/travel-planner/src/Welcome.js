import "./Welcome.css";
const Welcome = () => {
  return (
    <div className="welcome">
      <div id="user-avatar">
        <img src="https://source.unsplash.com/500x400/?man" alt="user avatar" />
      </div>
      <div id="user-hello">
        <p>
          Hello, <br />
          David
        </p>
      </div>
    </div>
  );
};

export default Welcome;