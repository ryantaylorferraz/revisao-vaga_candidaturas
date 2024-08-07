import { z } from "zod";

export const applicationSchema = z.object({
    id: z.number().positive(),
    name: z.string().min(1),
    email: z.string().min(1).email(),
    linkedin: z.string().min(1),
    opportunityId: z.number().positive(),
})

export const applicationCreateSchema = applicationSchema.omit({id: true, opportunityId: true});

// export const applicationUpdateSchema = applicationCreateSchema.partial()

export type TApplication = z.infer<typeof applicationSchema>

export type TApplicationCreate = z.infer<typeof applicationCreateSchema>;

// export type TApplicationUpdate = z.infer<typeof applicationUpdateSchema>;