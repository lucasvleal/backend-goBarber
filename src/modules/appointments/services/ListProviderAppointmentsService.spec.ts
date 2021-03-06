import 'reflect-metadata';

// import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let listProviderAppontments: ListProviderAppointmentsService;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        fakeCacheProvider = new FakeCacheProvider();

        listProviderAppontments = new ListProviderAppointmentsService(
            fakeAppointmentsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list appointments on a specific day from provider', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 6, 29, 14, 0, 0),
        });

        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 6, 29, 15, 0, 0),
        });

        const appointments = await listProviderAppontments.execute({
            provider_id: 'provider',
            year: 2020,
            month: 7,
            day: 29,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
