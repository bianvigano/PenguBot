const { Command } = require("klasa");

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            runIn: ["text"],
            cooldown: 10,
            aliases: ["setadmin", "addadmin", "deladmin", "removeadmin", "toggleadmin"],
            permissionLevel: 6,
            requiredPermissions: ["USE_EXTERNAL_EMOJIS"],
            requiredConfigs: ["staff-admins"],
            description: (msg) => msg.language.get("COMMAND_MAKE_ADMIN_DESCRPTION"),
            usage: "<member:user>",
            extendedHelp: "No extended help available."
        });
    }

    async run(msg, [member]) {
        if (msg.guild.configs.get("staff-admins").indexOf(member.id) !== -1) {
            await msg.guild.configs.update("staff-admins", member.id, { action: "remove" });
            return msg.sendMessage(`<:penguError:435712890884849664> ***${member.tag} ${msg.language.get("MESSAGE_ADMIN_REMOVE")}***`);
        } else {
            await msg.guild.configs.update("staff-admins", member.id, { action: "add" });
            return msg.sendMessage(`<:penguSuccess:435712876506775553> ***${member.tag} ${msg.language.get("MESSAGE_ADMIN_ADD")}***`);
        }
    }

};
