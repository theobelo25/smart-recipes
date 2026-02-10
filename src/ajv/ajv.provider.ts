import { Ajv, type Plugin } from 'ajv';
import { Provider } from '@nestjs/common';
import ajvErrors, { ErrorMessageOptions } from 'ajv-errors';
import ajvFormats, { type FormatsPluginOptions } from 'ajv-formats';
const addErrors = ajvErrors as unknown as Plugin<ErrorMessageOptions>;
const addFormats = ajvFormats as unknown as Plugin<FormatsPluginOptions>;

export const ajvProvider: Provider = {
  provide: 'AJV', // Custom injection token
  useFactory: () => {
    const ajv = new Ajv({ allErrors: true }); // Configure AJV as needed
    // Add custom formats, keywords, or parsers here
    addFormats(ajv);
    addErrors(ajv);
    return ajv;
  },
};
