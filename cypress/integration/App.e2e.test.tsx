import { expect, describe, it, cy, beforeEach } from "local-cypress";
import React from "react";
import { mount } from "@cypress/react";
import { sheet } from "@emotion/css";
import { Box, colors } from "@imtbl/design-system";

describe("<AssetDetailsContent />", () => {
  beforeEach(() => {
    sheet.tags.forEach((tag) => {
      document.body.appendChild(tag);
    });
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
    cy.visit("http://localhost:3000");
    cy.waitFor("@collectionsStub");
  });

  it("test 2", () => {
    cy.visit("http://localhost:3000");
    cy.waitFor("@collectionsStub");
  });
});
