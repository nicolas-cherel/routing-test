var jpath = require('json-path'),
    data = require(process.argv[2]);


// p = jpath.create('#/data/children[*]/media/title');
p = jpath.create('#/data/children[*]/data[]take(/title,/url,/created,/author)');




process.stdout.write(JSON.stringify(p.resolve(data)));
