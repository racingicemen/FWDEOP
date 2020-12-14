// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import "../css/app.scss"

// webpack automatically bundles all modules in your
// entry points. Those entry points can be configured
// in "webpack.config.js".
//
// Import deps with the dep name or local files with a relative path, for example:
//
//     import {Socket} from "phoenix"
//     import socket from "./socket"
//
import "phoenix_html"

var phoenix = require("phoenix");
var socket = new phoenix.Socket("/socket", {});
window.kconnect = () => socket.connect();
window.kprint = (str) => console.log(str);
window.new_channel = (subtopic, screen_name) => {
    return socket.channel("game:" + subtopic, {screen_name: screen_name});
}
window.join = (channel) => {
    channel.join()
        .receive("ok", response => {
            console.log("Joined successfully", response)
        })
        .receive("error", response => {
            console.log("Unable to join", response)
        })
}
window.leave = (channel) => {
    channel.leave()
        .receive("ok", response => {
            console.log("Left successfully", response)
        })
        .receive("error", response => {
            console.log("Unable to leave", response)
        })
}
window.say_hello = (channel, greeting) => {
    channel.push("hello", {"message": greeting})
        .receive("ok", response => {
            console.log("Hello", response.message)
        })
        .receive("error", response => {
            console.log("Unable to say hello to the channel.", response.message)
        })
}
window.new_game = (channel) => {
    channel.push("new_game")
        .receive("ok", response => {
            console.log("New Game!", response)
        })
        .receive("error", response => {
            console.log("Unable to start a new game", response)
        })
}
window.add_player = (channel, player) => {
    channel.push("add_player", player)
        .receive("error", response => {
            console.log("Unable to add player: " + player, response)
        })
}
window.position_island = (channel, player, island, row, col) => {
    var params = {"player": player, "island": island, "row": row, "col": col}
    channel.push("position_island", params)
        .receive("ok", response => {
            console.log("Island positioned!", response)
        })
        .receive("error", response => {
            console.log("Unable to position island.", response)
        })
}
window.set_islands = (channel, player) => {
    channel.push("set_islands", player)
        .receive("ok", response => {
            console.log("Here is the board:");
            console.dir(response.board);
        })
        .receive("error", response => {
            console.log("Unable to set islands for: " + player, response)
        })
}
window.guess_coordinate = (channel, player, row, col) => {
    var params = {"player": player, "row": row, "col": col}
    channel.push("guess_coordinate", params)
        .receive("error", response => {
            console.log("Unable to guess a coordiate: " + player, response)
        })
}