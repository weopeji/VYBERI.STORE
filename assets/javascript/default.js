(function (global) 
{
    io_connect( function() 
    {
        global.loadResources(['./assets/javascript/component.js'], () => {
            Main();
        });    
    });

    async function Main()
    {
        const members        = new global.Components.members();

        members.render();
    }

}(window))