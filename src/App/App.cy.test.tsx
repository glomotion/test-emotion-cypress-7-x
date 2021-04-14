import { expect, describe, it, cy, beforeEach } from "local-cypress";
import React from "react";
import { mount } from "@cypress/react";
import { sheet } from "@emotion/css";
import { Box, colors } from "@imtbl/design-system";

import App from ".";
import { renderCyComponent } from "../testRenderer";

describe("<AssetDetailsContent />", () => {
  beforeEach(() => {
    sheet.tags.forEach((tag) => {
      document.body.appendChild(tag);
    });
    cy.intercept(
      {
        method: "GET",
        pathname: "/config.json",
      },
      (req) => {
        req.reply({
          fixture: "config.json",
        });
      }
    ).as("configStub");
    cy.intercept(
      {
        method: "GET",
        pathname: "/v1/collections",
      },
      (req) => {
        req.reply({
          fixture: "mockCollections.json",
        });
      }
    ).as("collectionsStub");
  });

  it("test 1", () => {
    renderCyComponent({ withState: {}, children: <App />, initRootSaga: true });
    cy.waitFor("@collectionsStub");
  });

  it("test 2", () => {
    renderCyComponent({ withState: {}, children: <App />, initRootSaga: true });
    cy.waitFor("@collectionsStub");
  });
});
