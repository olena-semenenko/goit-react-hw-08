import HomePageImage from '/src/images/openart-image_0sbCG76V_1714247173870_raw.jpg';
import css from './HomePage.module.css';
const HomePage = () => {
  return (
    <div className={css.container}>
      <div className={css.img_container}>
        <img src={HomePageImage} alt="Smartphone with contact" className={css.img} />
      </div>
      <div className={css.text_container}>
        <div className={css.header}>
          <h1 className={css.text}>
            <p>
              Welcome to <span>ContactBook</span> - your personal assistant in storing and accessing
              contacts! Now you no longer have to worry about losing numbers or having difficulty
              accessing them.
            </p>
            <p>
              With <span>ContactBook</span>, you can store all your phone contacts in a secure place
              and access them from anywhere in the world.
            </p>
            <p>
              The user-friendly and intuitive interface of <span>ContactBook</span> allows you to
              easily add, edit, and delete contacts. No more wasting time searching for numbers -
              with
              <span>ContactBook</span>, your contacts are always at your fingertips.
            </p>
            <p>
              Join our community of users who are already enjoying the convenience of managing their
              contacts. Start using <span>ContactBook</span> today and forget about phone contact
              issues forever!
            </p>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
