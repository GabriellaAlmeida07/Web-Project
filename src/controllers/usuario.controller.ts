import Usuario from "@/models/usuario.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const secret = process.env.AUTH_SECRET as string;

export class UsuarioController {
    gerarToken(id: number, tipo: string) {
        return jwt.sign(
            {
                sub: id,
                tipo: tipo,
            },
            secret,
            {
                expiresIn: "30d",
            }
        );
    }

    validateToken(token: string) {
        return jwt.verify(token, secret);
    }

    async cadastrarUsuario(data: any) {
        // Já existe cadastro no bd
        const userExiste = await Usuario.findOne({
            where: { email: data.email },
        });

        if (userExiste) {
            throw new Error("Usuário já cadastrado");
        }

        // Hash da senha
        const salt = bcrypt.genSaltSync(10);
        const senhaHash = bcrypt.hashSync(data.senha_hash, salt);

        // Criação do usuário
        const user = await Usuario.create({
            nome: data.nome,
            cpf: data.cpf,
            celular: data.celular,
            email: data.email,
            senha_hash: senhaHash,
            tipo: data.tipo,
        });

        // Gera token
        const token = this.gerarToken(
            Number(user.dataValues.id),
            user.dataValues.tipo
        );

        return { user, token };
    }

    async login(data: any) {
        // Busca usuário
        const user = await Usuario.findOne({
            where: {
                email: data.email,
            },
        });

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        // Compara senha
        const senhaValida = bcrypt.compareSync(
            data.senha_hash,
            user.dataValues.senha_hash
        );

        if (!senhaValida) {
            throw new Error("Senha inválida");
        }

        // Token
        const token = this.gerarToken(
            Number(user.dataValues.id),
            user.dataValues.tipo
        );

        return {
            id: user.dataValues.id,
            email: user.dataValues.email,
            tipo: user.dataValues.tipo,
            token,
        };
    }
}
