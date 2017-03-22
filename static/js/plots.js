(function (exports) {
    var string_store = JSON.stringify({"no":{"body":["Languages: python"],"languages":["Python","matlab","javascript"],"libraries":["d3.js","matplotlib","bokeh","plotly"]}})
    var store = JSON.parse(localStorage['store'] || string_store);
    mouse_source = null;
    cheese_source = null;
    poison_source = null;
    var string_scoreboard = JSON.stringify({"no": 0})
    scoreboard = JSON.parse(localStorage['scoreboard'] || string_scoreboard)
    var previous_winner = 'no'

    function mazePlot() {
        var plt = Bokeh.Plotting

          xdr = new Bokeh.DataRange1d({
            start: 0,
            end: 6
          });
          ydr = new Bokeh.DataRange1d({
            start: 0,
            end: 4
          });
        // set up some data
        // create a data source
        mouse_source = new Bokeh.ColumnDataSource({
            data: {url: ['static/img/mouse.jpeg'], x: [.75], y: [1.25],
                    w: [.5], h: [.5],}
        });
        cheese_source = new Bokeh.ColumnDataSource({
            data: {url: ['static/img/cheese.png'], x: [4.75], y: [1.25],
                    w: [.5], h: [.5],}
        });
        poison_source = new Bokeh.ColumnDataSource({
            data: {url: ['static/img/poison.png'], x: [4.75], y: [3.25],
                    w: [.5], h: [.5],}
        });

        resetLocation()
        // make a figure
        var p = plt.figure({width: 600, height: 400, x_range: xdr, y_range: ydr, tools: false,});

        p.image_url({'field': 'url'}, {'field': 'x'}, {'field': 'y'}, {'field': 'w'}, {'field': 'h'}, {source: mouse_source})
        p.image_url({'field': 'url'}, {'field': 'x'}, {'field': 'y'}, {'field': 'w'}, {'field': 'h'}, {source: cheese_source})
        p.image_url({'field': 'url'}, {'field': 'x'}, {'field': 'y'}, {'field': 'w'}, {'field': 'h'}, {source: poison_source})

        p._xaxis.visible = false;
        p._yaxis.visible = false;
        p.xgrid.visible = false; // grid_line_color = 'white';
        p.ygrid.visible = false; // .grid_line_color = 'white';
        p.background_fill_color = "#ffffff"
        p.border_fill_color = "#222222"

        // add the plot to a document and display it
        var doc = new Bokeh.Document();
        doc.add_root(p);
        var div = document.getElementById("plotMazeSlide");
        Bokeh.embed.add_document_standalone(doc, div);

    }

    function smsMazeCallback(msg) {
        if (scoreboard[msg.from] === undefined) {
            scoreboard[msg.from] = 0
        }
        var initial_x = mouse_source.data.x[0]
        var initial_y = mouse_source.data.y[0]
        if (msg.body === 'up') {
            mouse_source.data.y[0] = mouse_source.data.y[0] + .5
        }
        if (msg.body === 'down') {
            mouse_source.data.y[0] = mouse_source.data.y[0] - .5
        }
        if (msg.body === 'left') {
            mouse_source.data.x[0] = mouse_source.data.x[0] - .5
        }
        if (msg.body === 'right') {
            mouse_source.data.x[0] = mouse_source.data.x[0] + .5
        }
        boundCheck(mouse_source)
        if ( mouse_source.data.x[0] == cheese_source.data.x[0] && mouse_source.data.y[0] == cheese_source.data.y[0] ) {
            scoreboard[msg.from] = scoreboard[msg.from] + 2
            previous_winner = msg.from;
            localStorage['scoreboard'] = JSON.stringify(scoreboard)
            resetLocation()
            // document.getElementById('currentWinner').innerHTML = "Current winner: ***-***-" + previous_winner.slice(-4)
            document.getElementById('currentWinner').innerHTML = "Current winner: ***-***-" + previous_winner.slice(-4)
        }
        if ( mouse_source.data.x[0] == poison_source.data.x[0] && mouse_source.data.y[0] == poison_source.data.y[0] ) {
            scoreboard[msg.from] = scoreboard[msg.from] + 1
            scoreboard[previous_winner] = scoreboard[previous_winner] - 1
            localStorage['scoreboard'] = JSON.stringify(scoreboard)
            resetLocation()
        }
        mouse_source.trigger('change')
    }
    function boundCheck(source) {
        if (source.data.x[0] < 0) {
            source.data.x[0] = 0
        }
        if (source.data.y[0] < 0.5) {
            source.data.y[0] = 1
        }
        if (source.data.x[0] > 5.5) {
            source.data.x[0] = 5
        }
        if (source.data.y[0] > 3.75) {
            source.data.y[0] = 3.5
        }
    }

    function resetLocation() {
            mouse_source.data.x[0] = (Math.floor(Math.random()*6*2) + 1)/2
            mouse_source.data.y[0] = (Math.floor(Math.random()*4*2) + 1)/2
            cheese_source.data.x[0] = (Math.floor(Math.random()*6*2)+ 1)/2
            cheese_source.data.y[0] = (Math.floor(Math.random()*4*2) + 1)/2
            poison_source.data.x[0] = (Math.floor(Math.random()*6*2) + 1)/2
            poison_source.data.y[0] = (Math.floor(Math.random()*4*2) + 1)/2
            boundCheck(mouse_source)
            boundCheck(cheese_source)
            boundCheck(poison_source)
            mouse_source.trigger('change')
            cheese_source.trigger('change')
            poison_source.trigger('change')
    }

    function surveyPlot() {

        var plt = Bokeh.Plotting

          var opts, anchor, attachment, bottom, column_names, columns, dy, g1, hover, i, j, k, label, labels, left, len, len1, len2, len3, m, n, name, o, orientation, p, palette, plot, r, r1, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, renderers, right, row, rows, source, stacked, tooltip, top, v, xaxis, xdr, xformatter, yaxis, ydr;
          if (opts == null) {
            opts = {width: 350, height: 250};
          }
          var labels = [];
          yaxis = new Bokeh.CategoricalAxis();
          ydr = new Bokeh.FactorRange({
            factors: labels
          });
          xaxis = new Bokeh.LinearAxis({
          });
          xdr = new Bokeh.DataRange1d({
            start: 0
          });
          stacked = (ref1 = opts.stacked) != null ? ref1 : false;
          orientation = (ref2 = opts.orientation) != null ? ref2 : "horizontal";
          renderers = [];

              source1 = new Bokeh.ColumnDataSource({
                data: {
                  left: [],
                  right: [],
                  top: [],
                  bottom: [],
                }
              });

              g1 = new Bokeh.Quad({
                left: {
                  field: "left"
                },
                bottom: {
                  field: "bottom"
                },
                right: {
                  field: "right"
                },
                top: {
                  field: "top"
                },
                line_color: null,
              });
              r1 = new Bokeh.GlyphRenderer({
                data_source: source1,
                glyph: g1
              });
              renderers.push(r1);

          plot = new Bokeh.Plot({
            x_range: xdr,
            y_range: ydr,
            width: opts.width,
            height: opts.height
          });
          if (opts.width != null) {
            plot.plot_width = opts.width;
          }
          if (opts.height != null) {
            plot.plot_height = opts.height;
          }
          plot.add_renderers.apply(plot, renderers);
          plot.add_layout(yaxis, "left");
          plot.add_layout(xaxis, "below");

          plot.x_range.range_padding = 10

        p1 = plot

          var labels = [];
          yaxis = new Bokeh.CategoricalAxis();
          ydr = new Bokeh.FactorRange({
            factors: labels
          });
          xaxis = new Bokeh.LinearAxis({
          });
          xdr = new Bokeh.DataRange1d({
            start: 0
          });
          stacked = (ref1 = opts.stacked) != null ? ref1 : false;
          orientation = (ref2 = opts.orientation) != null ? ref2 : "horizontal";
          renderers = [];

              source2 = new Bokeh.ColumnDataSource({
                data: {
                  left: [],
                  right: [],
                  top: [],
                  bottom: [],
                }
              });

              g1 = new Bokeh.Quad({
                left: {
                  field: "left"
                },
                bottom: {
                  field: "bottom"
                },
                right: {
                  field: "right"
                },
                top: {
                  field: "top"
                },
                line_color: null,
              });
              r1 = new Bokeh.GlyphRenderer({
                data_source: source2,
                glyph: g1
              });
              renderers.push(r1);

          plot = new Bokeh.Plot({
            x_range: xdr,
            y_range: ydr,
            width: opts.width,
            height: opts.height
          });
          if (opts.width != null) {
            plot.plot_width = opts.width;
          }
          if (opts.height != null) {
            plot.plot_height = opts.height;
          }
          plot.add_renderers.apply(plot, renderers);
          plot.add_layout(yaxis, "left");
          plot.add_layout(xaxis, "below");

          plot.x_range.range_padding = 10

        p2 = plot

        var p = new Bokeh.Column({children: [p2, p1]})

        // add the plot to a document and display it
        var doc = new Bokeh.Document();
        doc.add_root(p);
        var div = document.getElementById("plotSurveySlide");
        Bokeh.embed.add_document_standalone(doc, div);

        setInterval(function(){
            // source.data.from
            // source.data.y = y.slice(0, i)
            var languages = {}
            var libraries = {}
            for (var key in store) {
                if (store.hasOwnProperty(key)) {
                    if(store[key]['languages'] !== undefined){
                        var langs = store[key]['languages'];
                        for (i=0; i<langs.length; i++) {
                            var l = langs[i].toLowerCase()
                            if (languages[l] === undefined) {
                                languages[l] = 1
                            }
                            else {
                                languages[l] = languages[l] + 1
                            }
                        }
                    }
                    if(store[key]['libraries'] !== undefined){
                        var libs = store[key]['libraries'];
                        for (i=0; i<libs.length; i++) {
                            var l = libs[i].toLowerCase()
                            if (libraries[l] === undefined) {
                                libraries[l] = 1
                            }
                            else {
                                libraries[l] = libraries[l] + 1
                            }
                        }
                    }
                }
            }
            var left = []
            var top = []
            var bottom = []
            var count = []
            var factors = []
            for (var key in languages) {
                if (languages.hasOwnProperty(key)) {
                        left.push(0)
                        top.push(key + ":.75")
                        bottom.push(key + ":.25")
                        count.push(languages[key])
                        factors.push(key)
                    }
            }
            p1.y_range.factors = factors
            source1.data.right = count
            source1.data.left = left
            source1.data.top = top
            source1.data.bottom = bottom
            source1.trigger('change')

            var left = []
            var top = []
            var bottom = []
            var count = []
            var factors = []
            for (var key in libraries) {
                if (libraries.hasOwnProperty(key)) {
                        left.push(0)
                        top.push(key + ":.75")
                        bottom.push(key + ":.25")
                        count.push(libraries[key])
                        factors.push(key)
                    }
            }
            p2.y_range.factors = factors
            source2.data.right = count
            source2.data.left = left
            source2.data.top = top
            source2.data.bottom = bottom
            source2.trigger('change')
        }, 50)

        window.source = source

    }
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function smsCallback( msg ) {
        body = msg.body.replace(/\s/g, '').replace(/[^\x00-\x7F]/g, "");
        if (store[msg.from] === undefined) {
            store[msg.from] = {}
            store[msg.from]['body'] = []
        }
        store[msg.from]['body'].push(msg.body)
        if (body.toLowerCase().includes('languages:')) {
            var l = body.split(":")[1].trim().replace(/\,$/, '').split(',').filter( onlyUnique ).filter(String)
            for(var i=0; (i<l.length && i<10); i++){
                if(l[i].length>10) {
                    l[i] = l[i].slice(0, 10) + '...'
                }
            }
            store[msg.from]['languages'] = l.filter( onlyUnique )
        }
        elif (body.toLowerCase().includes('libraries:')) {
            var l = body.split(":")[1].trim().replace(/\,$/, '').split(',').filter( onlyUnique ).filter(String)
            for(var i=0; (i<l.length && i<10); i++){
                if(l[i].length>10) {
                    l[i] = l[i].slice(0, 10) + '...'
                }
            }
            store[msg.from]['libraries'] = l.filter( onlyUnique )
        }
        localStorage['store'] = JSON.stringify(store)
    }

    function largeDataPlot() {

        var plt = Bokeh.Plotting;

        // set up some data
        var M = 5000;
        var x = [];
        var y = [];
        // create a data source
        for (var i = 0; i <= M; i += 1) {
                x.push(Math.random() * 100 );
                y.push(Math.random() * 100 );
            }
        var source = new Bokeh.ColumnDataSource({
            data: {x: x, y: y}
        });

        // make a figure
        var p = plt.figure({title: "Interactive " + M + " points visualization", width: 400, height: 400, tools: "pan,box_zoom,wheel_zoom,lasso_select,reset,save",
            x_range: new Bokeh.DataRange1d({start: -5.0, end: 105.0}),
            y_range: new Bokeh.DataRange1d({start: -5.0, end: 105.0})
        });

        // call the line glyph method to add a line
        var line = p.circle({ field: "x" }, { field: "y" }, {
            source: source,
        });

        // add the plot to a document and display it
        var doc = new Bokeh.Document();
        doc.add_root(p);
        var div = document.getElementById("plotLargeData");
        Bokeh.embed.add_document_standalone(doc, div);

    }



    function titlePlot() {

        var plt = Bokeh.Plotting;

        // set up some data
        var M = 100;
        var x = [];
        var y = [];
        // create a data source
        var source = new Bokeh.ColumnDataSource({
            data: {x: x, y: y}
        });

        // make a figure
        var p = plt.figure({width: 400, height: 400, tools: false,
            x_range: new Bokeh.DataRange1d({start: -5.0, end: 105.0}),
            y_range: new Bokeh.DataRange1d({start: -5.0, end: 105.0})
        });

        p._xaxis.visible = false;
        p._yaxis.visible = false;
        p.xgrid.visible = false; // grid_line_color = 'white';
        p.ygrid.visible = false; // .grid_line_color = 'white';
        p.background_fill_color = "#f5f5dc"
        p.border_fill_color = "#222222"

        // call the line glyph method to add a line
        var line = p.line({ field: "x" }, { field: "y" }, {
            source: source,
            line_color: '#b90504'
        });


        // add the plot to a document and display it
        var doc = new Bokeh.Document();
        doc.add_root(p);
        var div = document.getElementById("plotTitleSlide");
        Bokeh.embed.add_document_standalone(doc, div);

        for (var i = 0; i <= M; i += 1) {
                x.push(i);
                y.push(50 * ( Math.random() * ( .1 ) + 0.9 ) );
            }
        y[50] = 75
        y[49] = 25


        // repeat
        var i = 0
        var text = null
        setInterval(function(){
            if ( i == 100 ) {
                setTimeout(function() {
                    text = text ? text : p.text({x:50,
                        y:10,
                        text: 'Press SPC to continue',
                        text_align: 'center',
                        text_font_size: '14pt',
                        text_font: 'Courier'
                    })
                }, 1000)
            }

            if (i > 100) {

                setTimeout(function() {
                    i = 0
                }, 3000)
            }
            i = i + 1
            source.data.x = x.slice(0, i)
            source.data.y = y.slice(0, i)
            source.trigger('change')
        }, 50)

    }

    exports.smsCallback = smsCallback
    exports.resetLocation = resetLocation
    exports.smsMazeCallback = smsMazeCallback
    exports.titlePlot = titlePlot
    exports.largeDataPlot = largeDataPlot
    exports.mazePlot = mazePlot
    exports.surveyPlot = surveyPlot
    window.store = store

}(window.plots = window.plots || {}));
