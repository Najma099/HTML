/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request: Request, env: Env, ctx:ExecutionContext): Promise<Response>{
		console.log(request.body);
		console.log(request.headers);
		
		if(request.method == "GET") {
			return Response.json({
				message: "You send a get request"
			});
		}
		else{
			return Response.json({
				message: "You didnt send a get request"
			})
		}
	},
} satisfies ExportedHandler<Env>;
