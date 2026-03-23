import { jest } from '@jest/globals';

// 1. O Mock deve ser definido ANTES de importar o que será testado
// Usamos unstable_mockModule para interceptar o ESM nativo
jest.unstable_mockModule('../../services/index.js', () => ({
  PRISMA: {
    cargo: {
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    }
  }
}));

// 2. Importamos dinamicamente após o mock ser registrado
const { PRISMA } = await import('../../services/index.js');
const cargoController = await import('../cargoController.js');

describe('cargoController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('buscar', () => {
    it('deve retornar lista ordenada de cargos', async () => {
      PRISMA.cargo.findMany.mockResolvedValue([{ id: 1, nome: 'Recepcionista' }]);
      const result = await cargoController.buscar();
      expect(result).toEqual([{ id: 1, nome: 'Recepcionista' }]);
      expect(PRISMA.cargo.findMany).toHaveBeenCalledWith({ orderBy: { id: 'asc' } });
    });

    it('deve retornar erro se findMany falhar', async () => {
      PRISMA.cargo.findMany.mockRejectedValue(new Error('Falha'));
      const result = await cargoController.buscar();
      expect(result).toEqual({ tipo: 'error', mensagem: 'Error: Falha' });
    });
  });

  describe('criar', () => {
    it('deve retornar sucesso ao criar', async () => {
      PRISMA.cargo.create.mockResolvedValue({ id: 2, nome: 'Gerente' });
      const result = await cargoController.criar({ nome: 'Gerente' });
      expect(result).toEqual({ tipo: 'success', mensagem: 'Registro criado com sucesso' });
    });

    it('deve retornar warning se create não retornar objeto', async () => {
      PRISMA.cargo.create.mockResolvedValue(null);
      const result = await cargoController.criar({ nome: 'Gerente' });
      expect(result).toEqual({ tipo: 'warning', mensagem: null });
    });

    it('deve retornar erro se create falhar', async () => {
      PRISMA.cargo.create.mockRejectedValue(new Error('Falha ao criar'));
      const result = await cargoController.criar({ nome: 'Gerente' });
      expect(result).toEqual({ tipo: 'error', mensagem: 'Error: Falha ao criar' });
    });
  });

  describe('editar', () => {
    it('deve retornar sucesso ao editar', async () => {
      PRISMA.cargo.update.mockResolvedValue({ id: 1, nome: 'Gerente' });
      const result = await cargoController.editar({ id: 1, nome: 'Gerente' });
      expect(result).toEqual({ tipo: 'success', mensagem: 'Registro atualizado com sucesso' });
    });

    it('deve retornar warning se update não retornar objeto', async () => {
      PRISMA.cargo.update.mockResolvedValue(null);
      const result = await cargoController.editar({ id: 1, nome: 'Gerente' });
      expect(result).toEqual({ tipo: 'warning', mensagem: null });
    });

    it('deve retornar erro se update falhar', async () => {
      PRISMA.cargo.update.mockRejectedValue(new Error('Falha ao editar'));
      const result = await cargoController.editar({ id: 1, nome: 'Gerente' });
      expect(result).toEqual({ tipo: 'error', mensagem: 'Error: Falha ao editar' });
    });
  });

  describe('deletar', () => {
    it('deve retornar sucesso ao deletar', async () => {
      PRISMA.cargo.delete.mockResolvedValue({ id: 1 });
      const result = await cargoController.deletar(1);
      expect(result).toEqual({ tipo: 'success', mensagem: 'Registro deletado com sucesso' });
    });

    it('deve retornar warning se delete não retornar objeto', async () => {
      PRISMA.cargo.delete.mockResolvedValue(null);
      const result = await cargoController.deletar(1);
      expect(result).toEqual({ tipo: 'warning', mensagem: null });
    });

    it('deve retornar erro se delete falhar', async () => {
      PRISMA.cargo.delete.mockRejectedValue(new Error('Falha ao deletar'));
      const result = await cargoController.deletar(1);
      expect(result).toEqual({ tipo: 'error', mensagem: 'Error: Falha ao deletar' });
    });
  });
});
