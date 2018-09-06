/* global env:true */
const conf = env.conf.templates || {};
conf.default = conf.default || {};

const _ = require('lodash');
const path = require('jsdoc/path');
const helper = require('jsdoc/util/templateHelper');
const template = require('jsdoc/template');
const lib = require('./lib');

class TemplateGenerator {
  constructor(data, opts, tutorials) {
    this.conf = conf;
    this.opts = opts;
    /* add all helper funcs ~ without binding ~ */
    _.each(_.keys(helper), (name) => { this[name] = helper[name]; });
    /* bind all lib funcs to class. */
    _.each(_.keys(lib), (name) => { this[name] = lib[name].bind(this); });
    /* tiny methods */
    this.findSpec = this.findSpec.bind(this);
    this.exec = this.exec.bind(this);
    /* tutorials */
    this.tutorials = tutorials;
    this.setTutorials(this.tutorials); // set up tutorials for helper
    /* paths */
    this.templatePath = path.normalize(opts.template);

    /* set special URLs */
    this.globalUrl = helper.getUniqueFilename('global');
    this.registerLink('global', this.globalUrl);
    this.indexUrl = this.getUniqueFilename('index');

    /* structure data and members */
    this.formatData(data);
    this.setMembers();

    // generate the pretty-printed source files first so other pages can link to them


    /* TODO: move this into its own class */
    this.view = new template.Template(path.join(this.templatePath, 'tmpl'));
    this.view.layout = conf.default.layoutFile ?
      path.getResourcePath(path.dirname(conf.default.layoutFile),
        path.basename(conf.default.layoutFile)) : 'layout.tmpl';
    this.view.find = this.findSpec;
    this.view.linkto = this.linkto;
    this.view.resolveAuthorLinks = this.resolveAuthorLinks;
    this.view.tutoriallink = this.linkToTutorial;
    this.view.htmlsafe = this.htmlsafe;
    this.view.outputSourceFiles = this.outputSourceFiles;
    this.view.nav = this.buildNav(this.members);
    this.attachModuleSymbols('modules');
    this.attachModuleSymbols('lists');
    if (this.outputSourceFiles) {
      this.generateSourceFiles(this.sourceFiles, opts.encoding);
    }
  }

  get outdir() {
    let outdir = path.normalize(env.opts.destination);
    const packageInfo = (this.findSpec({ kind: 'package' }) || []) [0];

    if (packageInfo && packageInfo.name) {
      outdir = path.join(outdir, packageInfo.name, packageInfo.version || '');
    }
    return outdir;
  }

  get outputSourceFiles() {
    return conf.default && conf.default.outputSourceFiles !== false;
  }

  exec() {
    this.saveChildren(this.tutorials);
    this.saveSpecial();
    this.saveMain();
  }


  findSpec(spec) { return this.find(this.data, spec); }
}

module.exports = (data, opts, tuts) => new TemplateGenerator(data, opts, tuts);
