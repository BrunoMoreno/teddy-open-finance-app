import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

describe('ClientsController', () => {
  const clientsService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    softDelete: jest.fn(),
  } as unknown as ClientsService;
  const controller = new ClientsController(clientsService);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('delegates create and list calls', async () => {
    const createDto = { name: 'Client One', salary: 3500, companyValue: 100000 };
    const query = { page: 2, pageSize: 16, recentLimit: 5 };

    await controller.create(createDto);
    await controller.findAll(query);

    expect(clientsService.create).toHaveBeenCalledWith(createDto);
    expect(clientsService.findAll).toHaveBeenCalledWith(query);
  });

  it('delegates detail and update calls', async () => {
    const updateDto = { name: 'Updated Client' };

    await controller.findOne('123');
    await controller.update('123', updateDto);

    expect(clientsService.findOne).toHaveBeenCalledWith('123');
    expect(clientsService.update).toHaveBeenCalledWith('123', updateDto);
  });

  it('returns success after soft delete', async () => {
    (clientsService.softDelete as jest.Mock).mockResolvedValue(undefined);

    await expect(controller.softDelete('123')).resolves.toEqual({ success: true });
    expect(clientsService.softDelete).toHaveBeenCalledWith('123');
  });
});
