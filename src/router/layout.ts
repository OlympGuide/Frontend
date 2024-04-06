export async function loadLayoutMiddleware(route: any) {
  if (!route.meta || !route.meta.layout) {
    console.error('Layout is not defined!');
    return;
  }

  try {
    let layout = route.meta.layout;
    let layoutComponent = await import(`@/layouts/${layout}.vue`);
    route.meta.layoutComponent = layoutComponent.default;
  } catch (e) {
    console.error('Error occurred in processing of layouts: ', e);
  }
}
