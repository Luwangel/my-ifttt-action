const core = require('@actions/core');
const github = require('@actions/github');
const got = require('got');

async function run(core, github, got) {
    const event = core.getInput('event', { required: true });
    const key = core.getInput('key', { required: true });
    const value1 = core.getInput('value1') || '';
    const value2 = core.getInput('value2') || '';
    const value3 = core.getInput('value3') || '';

    core.debug(JSON.stringify(github.context.payload));

    const params = {
        body: JSON.stringify({
            value1,
            value2,
            value3,
        }),
    };

    try {
        const result = await got.post(
            `https://maker.ifttt.com/trigger/${event}/with/key/${key}`,
            params
        );
        const { statusCode, body } = result.json();

        core.debug(statusCode, body);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run(core, github, got);
