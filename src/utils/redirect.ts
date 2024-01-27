// import { NextPageContext } from "next";
// import Router from "next/router";

import type { IncomingMessage, ServerResponse } from "http";

export const redirect = (
  res: ServerResponse<IncomingMessage>,
  location: string,
) => {
  res.setHeader("location", location);
  res.statusCode = 302;
  res.end();
};
