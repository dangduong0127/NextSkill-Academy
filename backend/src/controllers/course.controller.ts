import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { handlePage } from "../services/course.services";

const paginationController = async (req: Request, res: Response) => {
  try {
    const respose = await handlePage(req.query);
    res.status(StatusCodes.OK).json(respose);
  } catch (err) {
    console.log(err);
  }
};

export { paginationController };
