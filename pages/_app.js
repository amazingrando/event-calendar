import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import PropTypes from 'prop-types';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};
