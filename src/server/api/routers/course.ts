
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const courseRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {

        return ctx.db.course.findMany();

  }),});