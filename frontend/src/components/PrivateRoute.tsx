import React from 'react';

import { useTypedSelector } from '../hooks';
import {
  Redirect,
  Route,
  RouteComponentProps,
  RouteProps,
} from '../utils/router';

export interface Props {
  component: React.ElementType;
}

const PrivateRoute: React.FC<RouteProps & Props> = ({
  component: Component,
  ...rest
}) => {
  const token = useTypedSelector((state) => state.auth.token);

  const render = (props: RouteComponentProps): React.ReactNode => {
    if (token) {
      return <Component {...props} />;
    } else {
      return (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      );
    }
  };

  return <Route {...rest} render={render} />;
};

export default PrivateRoute;
