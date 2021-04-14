import React, { useEffect } from "react";
import {
  colors,
  FlexLayout,
  gradients,
  ParagraphText,
  SectionHeading,
  VerticalSpace,
} from "@imtbl/design-system";
import { createStructuredSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/css";

import {
  makeSelectCollections,
  makeSelectConfig,
  makeSelectFlags,
  makeSelectInitialized,
} from "./selectors";
import { loadSomeData } from "./actions";

const stateSelector = createStructuredSelector({
  initialized: makeSelectInitialized(),
  config: makeSelectConfig(),
  defaultFlags: makeSelectFlags(),
  collections: makeSelectCollections(),
});

export default function App() {
  const props = useSelector(stateSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSomeData());
  }, []);
  return (
    <FlexLayout
      flexGrow={1}
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      height="100vh"
      width="100vw"
      backgroundGradient={gradients.bg.simple()}
      padding="30px"
    >
      <SectionHeading textAlign="center">Demo Application</SectionHeading>
      <VerticalSpace top="2x-large">
        <ParagraphText
          fillColor={colors.light[100]}
          textAlign="center"
          className={css`
            word-break: break-all;
          `}
        >
          {JSON.stringify({ props })}
        </ParagraphText>
      </VerticalSpace>
    </FlexLayout>
  );
}
