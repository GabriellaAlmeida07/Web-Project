export async function POST() {
    const response = Response.json({
        message: "Logout realizado",
    });

    response.headers.append(
        "Set-Cookie",
        "token=; Path=/; HttpOnly; Max-Age=0"
    );

    return response;
}