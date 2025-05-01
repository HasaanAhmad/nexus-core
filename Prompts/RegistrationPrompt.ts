 export const PROMPT = `
    Based on the following description, generate a form in JSON format with the following structure:
    
    - "title": A string for the form title.
    - "subheading": A string for the form subheading.
    - "fields": An array of objects, where each object represents a form field and contains:
      - "label": The label for the form field.
      - "name": The name of the form field (used as an identifier).
      - "placeholder": A placeholder text for the form field.
      - "type": The type of the form field (e.g., "text", "email", "tel", "date", "select", "textarea").
      - "required": A boolean indicating if the field is required.
      - If the field type is "select", include an "options" array with the available options.
    
    Example:
    {
      "title": "Football Academy Registration",
      "subheading": "Join us and unleash your football potential!",
      "fields": [
        {
          "label": "First Name",
          "name": "firstName",
          "placeholder": "Enter your first name",
          "type": "text",
          "required": true
        },
        {
          "label": "Position",
          "name": "position",
          "placeholder": "Select your preferred position",
          "type": "select",
          "options": ["Goalkeeper", "Defender", "Midfielder", "Forward"],
          "required": true
        }
      ]
    }
    Please provide the generated form JSON in this format.`