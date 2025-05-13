import java.io.*;
import java.net.*;

public class GreetClient {

    private Socket clientSocket;
    private PrintWriter out;
    private BufferedReader in;
    private BufferedReader console;

    public void startConnection(String ip, int port) {
        try {
            clientSocket = new Socket(ip, port);
            out = new PrintWriter(clientSocket.getOutputStream(), true);
            in = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream())
            );
            console = new BufferedReader(new InputStreamReader(System.in));

            String inputLine, outputLine;
            while (true) {
                // Send message to server
                System.out.print("Najma: ");
                outputLine = console.readLine();
                out.println(outputLine);
                if (outputLine.equalsIgnoreCase("exit")) {
                    break;
                }

                // Read response from server
                inputLine = in.readLine();
                if (inputLine == null || inputLine.equalsIgnoreCase("exit")) {
                    System.out.println("Shoyeb ended the chat.");
                    break;
                }
                System.out.println("Shoyeb: " + inputLine);
            }

            stopConnection();
        } catch (IOException e) {
            System.out.println("Client error: " + e.getMessage());
        }
    }

    public void stopConnection() {
        try {
            out.close();
            in.close();
            clientSocket.close();
        } catch (IOException e) {
            System.out.println("Error closing client: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        GreetClient client = new GreetClient();
        client.startConnection("10.108.173.98", 6666);
    }
}