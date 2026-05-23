import { sequelize } from "@/models/dbconfig";
export const runtime = "nodejs";
export async function GET() {
  try {
    await sequelize.authenticate();
    console.log("ok")
    return Response.json({
      message: "Conectado no Neon com sucesso!",
    });
  } catch (err) {
    return Response.json(
      {
        message: "Erro na conexão",
        error: String(err),
      },
      { status: 500 }
    );
  }
}