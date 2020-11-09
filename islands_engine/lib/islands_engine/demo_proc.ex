defmodule IslandsEngine.DemoProc do
  def loop() do
    receive do
      msg -> IO.puts "I got a message: #{msg}"
    end
    loop()
  end
end
