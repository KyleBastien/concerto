/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const Validator = require('./validator');

// Types needed for TypeScript generation.
/* eslint-disable no-unused-vars */
/* istanbul ignore next */
if (global === undefined) {
    const Field = require('./field');
}
/* eslint-enable no-unused-vars */

/**
 * A Validator to enforce that a string matches a regex
 * @private
 * @class
 * @memberof module:concerto-core
 */
class StringValidator extends Validator{

    /**
     * Create a StringValidator.
     * @param {Field} field - the field this validator is attached to
     * @param {Object} validator - The validation string. This must be a regex
     * expression.
     *
     * @throws {IllegalModelException}
     */
    constructor(field, validator) {
        super(field, validator);
        try {
            if (validator.flags) {
                this.regex = new RegExp(validator.pattern, validator.flags);
            } else {
                this.regex = new RegExp(validator.pattern);
            }
        }
        catch(exception) {
            this.reportError(exception.message);
        }
    }

    /**
     * Validate the property
     * @param {string} identifier the identifier of the instance being validated
     * @param {Object} value the value to validate
     * @throws {IllegalModelException}
     * @private
     */
    validate(identifier, value) {
        if(value !== null) {
            if(!this.regex.test(value)) {
                this.reportError(identifier, 'Value \'' + value + '\' failed to match validation regex: ' + this.regex);
            }
        }
    }

    /**
     * Returns the RegExp object associated with the string validator
     * @returns {RegExp} the RegExp object
     */
    getRegex() {
        return this.regex;
    }
}

module.exports = StringValidator;
