/* eslint-disable react/prop-types, import/no-extraneous-dependencies */
import React from "react";
import FirebaseProvider from "./src/components/FirebaseProvider";
import { db, auth, facebook, google } from "./src/services/firebase";

exports.wrapRootComponent = ({Root}) => {
  return () => (
    <FirebaseProvider firebase={{ db, auth, facebook, google }}>
      <Root />
    </FirebaseProvider>
  );
};
