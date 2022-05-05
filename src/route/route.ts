import Router from 'koa-router'

const router = new Router();
router.prefix('/route')

router.get('/', async (ctx: any) => {
  ctx.body = {
    data: [1, 2, 3]
  };
})

export default router
