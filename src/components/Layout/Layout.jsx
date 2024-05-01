import { Suspense } from 'react';
import Loader from '/src/components/Loader/Loader';
import AppBar from '../AppBar/AppBar';

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      <div>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </div>
    </div>
  );
};
export default Layout;
