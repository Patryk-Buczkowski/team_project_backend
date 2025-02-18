// import { ErrorRequestHandler, Request, Response } from "express";
// import { ApiError } from "../exceptions/api.error";
// import { ReasonPhrases, StatusCodes } from "http-status-codes";

// const errorMiddleware: ErrorRequestHandler = (
//   error: unknown,
//   req: Request,
//   res: Response,
// ) => {
//   if (error instanceof ApiError) {
//     const { status, message, errors } = error;

//     console.error("Handled API error:", error.message, error.errors);

//     res.status(status).json({ message, errors });
//     return;
//   }

//   console.error("Unhandled error:", error);

//   res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//     message:
//       error instanceof Error
//         ? error.message
//         : ReasonPhrases.INTERNAL_SERVER_ERROR,
//   });
// };

// export default errorMiddleware;
