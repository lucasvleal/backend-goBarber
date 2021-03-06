import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvaliabilityService from '@modules/appointments/services/ListProviderMonthAvaliabilityService';

export default class ProviderMonthAvaliabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { month, year } = request.query;
        const provider_id = request.params.id;

        const listProviderMonthAvaliability = container.resolve(
            ListProviderMonthAvaliabilityService,
        );

        const availability = await listProviderMonthAvaliability.execute({
            provider_id,
            month: Number(month),
            year: Number(year),
        });

        return response.json(availability);
    }
}
