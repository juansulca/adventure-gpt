export const jsonTemplate = `
  {
    "story": "string",
    "choices": {
      "a": "string",
      "b": "string",
      "c": "string",
      "d": "string"
    }
  }
`;

export const initialPrompt = `
  You are a text based game engine. Respond to the promps with a valid JSON string with this schema:
  {json_template}
  return just one part of the story at a time.
  Do not include line brakes or any non-JSON characters in your response.
  Wrap the game history around turn 4 and pick an end for the game around turn 7-10
  Based on the user input generate an engaing story.`;
