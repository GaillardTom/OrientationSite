
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const jobsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.jobs.findMany();
  }, 
  
  ),});