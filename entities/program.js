var HashMap, Program, initialContext;

initialContext = require('../analyzer/analyzer').initialContext;

HashMap = require('hashmap').HashMap;

Program = (function() {
    function Program(block) {
        this.block = block;
    }

    Program.prototype.toString = function() {
        return "(Program " + this.block + ")";
    };

    Program.prototype.analyze = function() {
        return this.block.analyze(initialContext());
    };

    Program.prototype.optimize = function() {
        this.block = this.block.optimize();
        return this;
    };

    Program.prototype.showSemanticGraph = function() {
        var dump, rep, seenEntities, tag;
        tag = 0;
        seenEntities = new HashMap();
        dump = function(entity, tag) {
            var key, props, tree, value;
            props = {};
            for (key in entity) {
                tree = entity[key];
                value = rep(tree);
                if (value !== void 0) {
                    props[key] = value;
                }
            }
            return console.log("%d %s %j", tag, entity.constructor.name, props);
        };
        rep = function(e) {
            if (/undefined|function/.test(typeof e)) {
                return void 0;
            } else if (/number|string|boolean/.test(typeof e)) {
                return e;
            } else if (Array.isArray(e)) {
                return e.map(rep);
            } else if (e.kind) {
                return e.lexeme;
            } else {
                if (!seenEntities.has(e)) {
                    seenEntities.set(e, ++tag);
                    dump(e, tag);
                }
                return seenEntities.get(e);
            }
        };
        return dump(this, 0);
    };

    return Program;

})();

module.exports = Program;