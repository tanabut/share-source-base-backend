// TODO: Add logger profile
import { logger } from '@share-source-base/logger';

export { logger } from '@share-source-base/logger';

// For backward compactibility
// TODO: Remove this when all files in core import from named export
// and others import logger from its own module
export default logger;
