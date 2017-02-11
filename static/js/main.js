(function (exports) {

    var plt = Bokeh.Plotting;

    // set up some data
    var M = 100;
    var xx = [];
    var yy = [];
    var colors = [];
    var radii = [];
    for (var y = 0; y <= M; y += 4) {
        for (var x = 0; x <= M; x += 4) {
            xx.push(x);
            yy.push(y);
            colors.push(plt.color(50+2*x, 30+2*y, 150));
            radii.push(Math.random() * 0.4 + 1.7)
        }
    }

    // create a data source
    var source = new Bokeh.ColumnDataSource({
        data: { x: xx, y: yy, radius: radii, colors: colors }
    });

    // make the plot and add some tools
    var tools = "pan,wheel_zoom,box_zoom,reset,save,crosshair";
    var p = plt.figure({title: "Colorful Scatter", tools: tools });

    // call the circle glyph method to add some circle glyphs
    var circles = p.circle({ field: "x" }, { field: "y" }, {
        source: source,
        radius: radii,
        fill_color: colors,
        fill_alpha: 0.6,
        line_color: null
    });

    // add the plot to a document and display it
    var doc = new Bokeh.Document();
    doc.add_root(p);
    var div = document.getElementById("plotTitleSlide");
    Bokeh.embed.add_document_standalone(doc, div);



}(window.slides = window.slides || {}));
