(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./assets/javascript/component.js'], () => {
            global.loadResources(['./assets/javascript/settings.js'], () => {
                Main();
            }); 
        });    
    });

    async function Main()
    {
        const all_data          = new global.Components._data();
        const news              = new global.Components.news();
        const best              = new global.Components.best();
        const bottom            = new global.Components.bottom();
        const header            = new global.Components.header();
        const moneys_data       = new global.Components.moneys_data();
        const close_block       = new global.Components.close_block();
        const intro_members     = new global.Components.intro_members();
        const all_members       = new global.Components.all_members();
        const settings          = new global.Components.settings();

        global.all_data     = await all_data.render();

        var _page           = _GET('page');

        var render = 
        {
            "members": async function()
            {
                await header            .render({size: "min"});
                await close_block       .render();
                await intro_members     .render();
                await all_members       .render();
            },
            "default": async function()
            {
                await header            .render();
                await best              .render();
                await news              .render();
                await bottom            .render();
            },
            "settings": async function()
            {
                await header            .render({size: "min"});
                await close_block       .render();
                await settings          .render();
            },
        }

        if(_page)
        {
            render[_page]();
        } else {
            render["default"]();
        }
        
        console.log(global.all_data);
    }

}(window))