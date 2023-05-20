const {
    ContextMenuCommandBuilder,
    ApplicationCommandType,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
    ActionRowBuilder,
} = require('discord.js');

selectMenuComponent = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("statusSelectMenu")
            .setPlaceholder("Select a status")
            .setMaxValues(1)
            .setOptions([
                new StringSelectMenuOptionBuilder()
                    .setLabel("🔴 Denied")
                    .setDescription("The suggestion is denied")
                    .setValue("denied"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("🟡 In Progress")
                    .setDescription("The suggestion is being worked on")
                    .setValue("in progress"),
                new StringSelectMenuOptionBuilder()
                    .setLabel("🟢 Implemented")
                    .setDescription("The suggestion is finished and implemented")
                    .setValue("implemented"),
            ])
    );

exports.data = new ContextMenuCommandBuilder()
    .setName("Set Status")
    .setType(ApplicationCommandType.Message);

exports.run = async (client, interaction) => {
    // client.cache.set("suggestionEmbed", interaction.targetMessage.embeds[0]);
    client.cache.set("suggestionMessage", interaction.targetMessage);

    console.log(selectMenuComponent.toJSON());

    interaction.reply({
        "content": "Select the status you want to add for this message",
        "ephemeral": true,
        "components": [
            selectMenuComponent.toJSON()
        ]
    });
};