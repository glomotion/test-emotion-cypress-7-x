import React, { useEffect } from "react";
import { colors, FlexLayout, HeadingText } from "@imtbl/design-system";
import axios from "axios";

export default function NotFoundPage() {
  useEffect(() => {
    axios
      .get("https://api.dev.x.immutable.com/v1/collections")
      .then((resp: any) => {
        console.log("@@@@@@@@@@@@@", resp.data);
      });
  }, []);
  return (
    <FlexLayout flexGrow={1} alignItems="center" justifyContent="center">
      <HeadingText fillColor={colors.light[100]}>
        adsdasdasdasdasa dsdas dadaadsads
      </HeadingText>
    </FlexLayout>
  );
}
