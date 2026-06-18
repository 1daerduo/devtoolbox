'use client'

import { useState, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

type SchemaType = 'Article' | 'Product' | 'FAQ' | 'Recipe' | 'BreadcrumbList' | 'Organization' | 'LocalBusiness' | 'Event'

interface FAQItem { question: string; answer: string }
interface BreadcrumbItem { name: string; url: string }

export default function SchemaGeneratorClient() {
  const [schemaType, setSchemaType] = useState<SchemaType>('Article')

  // Article
  const [articleHeadline, setArticleHeadline] = useState('')
  const [articleAuthor, setArticleAuthor] = useState('')
  const [articleDate, setArticleDate] = useState('')
  const [articleImage, setArticleImage] = useState('')
  const [articleDesc, setArticleDesc] = useState('')

  // Product
  const [productName, setProductName] = useState('')
  const [productImage, setProductImage] = useState('')
  const [productDesc, setProductDesc] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCurrency, setProductCurrency] = useState('CNY')
  const [productRating, setProductRating] = useState('')
  const [productReviewCount, setProductReviewCount] = useState('')

  // FAQ
  const [faqs, setFaqs] = useState<FAQItem[]>([
    { question: '什么是 JSON-LD？', answer: 'JSON-LD 是一种基于 JSON 的结构化数据格式，用于描述网页内容以便搜索引擎理解。' },
  ])

  // Recipe
  const [recipeName, setRecipeName] = useState('')
  const [recipeDesc, setRecipeDesc] = useState('')
  const [recipeAuthor, setRecipeAuthor] = useState('')
  const [recipePrepTime, setRecipePrepTime] = useState('')
  const [recipeCookTime, setRecipeCookTime] = useState('')
  const [recipeServings, setRecipeServings] = useState('')

  // Breadcrumb
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([
    { name: '首页', url: 'https://example.com' },
    { name: '产品', url: 'https://example.com/products' },
  ])

  // Organization
  const [orgName, setOrgName] = useState('')
  const [orgUrl, setOrgUrl] = useState('')
  const [orgLogo, setOrgLogo] = useState('')
  const [orgDesc, setOrgDesc] = useState('')

  // LocalBusiness
  const [bizName, setBizName] = useState('')
  const [bizAddress, setBizAddress] = useState('')
  const [bizPhone, setBizPhone] = useState('')
  const [bizHours, setBizHours] = useState('')

  // Event
  const [eventName, setEventName] = useState('')
  const [eventStart, setEventStart] = useState('')
  const [eventEnd, setEventEnd] = useState('')
  const [eventLocation, setEventLocation] = useState('')
  const [eventDesc, setEventDesc] = useState('')

  const [copied, setCopied] = useState(false)

  const generateSchema = useCallback(() => {
    const ctx = { '@context': 'https://schema.org' }
    let schema: Record<string, unknown> = {}

    switch (schemaType) {
      case 'Article':
        schema = {
          ...ctx,
          '@type': 'Article',
          headline: articleHeadline || '文章标题',
          author: { '@type': 'Person', name: articleAuthor || '作者名' },
          datePublished: articleDate || new Date().toISOString().split('T')[0],
          image: articleImage ? [articleImage] : ['https://example.com/image.jpg'],
          description: articleDesc || '文章描述',
          publisher: { '@type': 'Organization', name: 'MoreToolbox' },
        }
        break
      case 'Product':
        schema = {
          ...ctx,
          '@type': 'Product',
          name: productName || '产品名称',
          image: productImage ? [productImage] : ['https://example.com/product.jpg'],
          description: productDesc || '产品描述',
          offers: {
            '@type': 'Offer',
            price: productPrice || '99.00',
            priceCurrency: productCurrency,
          },
        }
        if (productRating) {
          ;(schema as any).aggregateRating = {
            '@type': 'AggregateRating',
            ratingValue: productRating,
            reviewCount: productReviewCount || '1',
          }
        }
        break
      case 'FAQ':
        schema = {
          ...ctx,
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.question || '问题',
            acceptedAnswer: { '@type': 'Answer', text: f.answer || '回答' },
          })),
        }
        break
      case 'Recipe':
        schema = {
          ...ctx,
          '@type': 'Recipe',
          name: recipeName || '菜谱名称',
          description: recipeDesc || '菜谱描述',
          author: { '@type': 'Person', name: recipeAuthor || '厨师' },
          prepTime: recipePrepTime || 'PT15M',
          cookTime: recipeCookTime || 'PT30M',
          recipeYield: recipeServings || '4 人份',
        }
        break
      case 'BreadcrumbList':
        schema = {
          ...ctx,
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((b, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: b.name || `第${i + 1}层`,
            item: b.url || `https://example.com/${i + 1}`,
          })),
        }
        break
      case 'Organization':
        schema = {
          ...ctx,
          '@type': 'Organization',
          name: orgName || '组织名称',
          url: orgUrl || 'https://example.com',
          logo: orgLogo || 'https://example.com/logo.png',
          description: orgDesc || '组织描述',
        }
        break
      case 'LocalBusiness':
        schema = {
          ...ctx,
          '@type': 'LocalBusiness',
          name: bizName || '商家名称',
          address: { '@type': 'PostalAddress', streetAddress: bizAddress || '街道地址' },
          telephone: bizPhone || '+86-10-12345678',
          openingHours: bizHours || 'Mo-Su 09:00-22:00',
        }
        break
      case 'Event':
        schema = {
          ...ctx,
          '@type': 'Event',
          name: eventName || '活动名称',
          startDate: eventStart || new Date().toISOString(),
          endDate: eventEnd || new Date().toISOString(),
          location: { '@type': 'Place', name: eventLocation || '活动地点' },
          description: eventDesc || '活动描述',
        }
        break
    }
    return JSON.stringify(schema, null, 2)
  }, [
    schemaType, articleHeadline, articleAuthor, articleDate, articleImage, articleDesc,
    productName, productImage, productDesc, productPrice, productCurrency, productRating, productReviewCount,
    faqs, recipeName, recipeDesc, recipeAuthor, recipePrepTime, recipeCookTime, recipeServings,
    breadcrumbs, orgName, orgUrl, orgLogo, orgDesc,
    bizName, bizAddress, bizPhone, bizHours,
    eventName, eventStart, eventEnd, eventLocation, eventDesc,
  ])

  const code = generateSchema()

  const handleCopy = async () => {
    const wrapped = `<script type="application/ld+json">\n${code}\n</script>`
    await navigator.clipboard.writeText(wrapped)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const addFaq = () => setFaqs([...faqs, { question: '', answer: '' }])
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i))
  const updateFaq = (i: number, field: 'question' | 'answer', val: string) => {
    const next = [...faqs]
    next[i][field] = val
    setFaqs(next)
  }

  const addCrumb = () => setBreadcrumbs([...breadcrumbs, { name: '', url: '' }])
  const removeCrumb = (i: number) => setBreadcrumbs(breadcrumbs.filter((_, idx) => idx !== i))
  const updateCrumb = (i: number, field: 'name' | 'url', val: string) => {
    const next = [...breadcrumbs]
    next[i][field] = val
    setBreadcrumbs(next)
  }

  return (
    <div>
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Schema 生成器' }]} />

      <h1 className="text-2xl font-bold mb-2 text-gray-900">Schema Markup 生成器 | JSON-LD Structured Data Generator</h1>
      <p className="text-sm text-gray-500 mb-6">可视化生成 Schema.org 结构化数据（JSON-LD），让 Google 搜索结果显示富文本摘要（Rich Snippets），提升点击率。</p>

      {/* Schema 类型选择 */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <label className="block text-sm font-semibold text-gray-800 mb-2">选择 Schema 类型</label>
        <div className="flex flex-wrap gap-2">
          {(['Article', 'Product', 'FAQ', 'Recipe', 'BreadcrumbList', 'Organization', 'LocalBusiness', 'Event'] as SchemaType[]).map(t => (
            <button
              key={t}
              onClick={() => setSchemaType(t)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                schemaType === t ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 左侧：表单输入 */}
        <div className="space-y-4">
          {schemaType === 'Article' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">📰 文章信息</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">标题 (Headline)</label>
                  <input value={articleHeadline} onChange={e => setArticleHeadline(e.target.value)} placeholder="文章标题"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">作者 (Author)</label>
                  <input value={articleAuthor} onChange={e => setArticleAuthor(e.target.value)} placeholder="作者姓名"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">发布日期 (ISO 8601)</label>
                  <input value={articleDate} onChange={e => setArticleDate(e.target.value)} placeholder="2026-06-19"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">封面图 URL</label>
                  <input value={articleImage} onChange={e => setArticleImage(e.target.value)} placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">描述 (Description)</label>
                  <textarea value={articleDesc} onChange={e => setArticleDesc(e.target.value)} rows={2} placeholder="文章简介"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
            </div>
          )}

          {schemaType === 'Product' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">🛍️ 产品信息</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">产品名称</label>
                  <input value={productName} onChange={e => setProductName(e.target.value)} placeholder="产品名称"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">图片 URL</label>
                  <input value={productImage} onChange={e => setProductImage(e.target.value)} placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">产品描述</label>
                  <textarea value={productDesc} onChange={e => setProductDesc(e.target.value)} rows={2} placeholder="产品介绍"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">价格</label>
                    <input value={productPrice} onChange={e => setProductPrice(e.target.value)} placeholder="99.00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">货币</label>
                    <select value={productCurrency} onChange={e => setProductCurrency(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
                      <option value="CNY">CNY 人民币</option>
                      <option value="USD">USD 美元</option>
                      <option value="EUR">EUR 欧元</option>
                      <option value="JPY">JPY 日元</option>
                      <option value="GBP">GBP 英镑</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">评分 (1-5)</label>
                    <input value={productRating} onChange={e => setProductRating(e.target.value)} placeholder="4.5"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">评论数</label>
                    <input value={productReviewCount} onChange={e => setProductReviewCount(e.target.value)} placeholder="128"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {schemaType === 'FAQ' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">❓ FAQ 问答</h3>
              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-600">问答 #{i + 1}</span>
                      {faqs.length > 1 && (
                        <button onClick={() => removeFaq(i)} className="text-xs text-red-600 hover:text-red-700">删除</button>
                      )}
                    </div>
                    <input value={f.question} onChange={e => updateFaq(i, 'question', e.target.value)} placeholder="问题"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm mb-2 focus:ring-2 focus:ring-primary-500" />
                    <textarea value={f.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} placeholder="答案" rows={2}
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                ))}
                <button onClick={addFaq} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-primary-400 hover:text-primary-600">
                  + 添加问答
                </button>
              </div>
            </div>
          )}

          {schemaType === 'Recipe' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">🍳 菜谱信息</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">菜谱名称</label>
                  <input value={recipeName} onChange={e => setRecipeName(e.target.value)} placeholder="番茄炒蛋"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">描述</label>
                  <textarea value={recipeDesc} onChange={e => setRecipeDesc(e.target.value)} rows={2} placeholder="经典家常菜"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">作者</label>
                  <input value={recipeAuthor} onChange={e => setRecipeAuthor(e.target.value)} placeholder="厨师姓名"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">准备 (ISO)</label>
                    <input value={recipePrepTime} onChange={e => setRecipePrepTime(e.target.value)} placeholder="PT15M"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">烹饪 (ISO)</label>
                    <input value={recipeCookTime} onChange={e => setRecipeCookTime(e.target.value)} placeholder="PT10M"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">份量</label>
                    <input value={recipeServings} onChange={e => setRecipeServings(e.target.value)} placeholder="2 人份"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {schemaType === 'BreadcrumbList' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">🍞 面包屑导航</h3>
              <div className="space-y-3">
                {breadcrumbs.map((b, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-gray-600">第 {i + 1} 层</span>
                      {breadcrumbs.length > 1 && (
                        <button onClick={() => removeCrumb(i)} className="text-xs text-red-600 hover:text-red-700">删除</button>
                      )}
                    </div>
                    <input value={b.name} onChange={e => updateCrumb(i, 'name', e.target.value)} placeholder="名称"
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm mb-2 focus:ring-2 focus:ring-primary-500" />
                    <input value={b.url} onChange={e => updateCrumb(i, 'url', e.target.value)} placeholder="https://..."
                      className="w-full px-2 py-1.5 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                ))}
                <button onClick={addCrumb} className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-primary-400 hover:text-primary-600">
                  + 添加层级
                </button>
              </div>
            </div>
          )}

          {schemaType === 'Organization' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">🏢 组织信息</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">组织名称</label>
                  <input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="公司名称"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">官网 URL</label>
                  <input value={orgUrl} onChange={e => setOrgUrl(e.target.value)} placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Logo URL</label>
                  <input value={orgLogo} onChange={e => setOrgLogo(e.target.value)} placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">描述</label>
                  <textarea value={orgDesc} onChange={e => setOrgDesc(e.target.value)} rows={2} placeholder="公司简介"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
            </div>
          )}

          {schemaType === 'LocalBusiness' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">📍 本地商家</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">商家名称</label>
                  <input value={bizName} onChange={e => setBizName(e.target.value)} placeholder="店铺名"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">地址</label>
                  <input value={bizAddress} onChange={e => setBizAddress(e.target.value)} placeholder="街道地址"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">电话</label>
                  <input value={bizPhone} onChange={e => setBizPhone(e.target.value)} placeholder="+86-10-12345678"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">营业时间</label>
                  <input value={bizHours} onChange={e => setBizHours(e.target.value)} placeholder="Mo-Su 09:00-22:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
            </div>
          )}

          {schemaType === 'Event' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">🎉 活动信息</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">活动名称</label>
                  <input value={eventName} onChange={e => setEventName(e.target.value)} placeholder="活动名称"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">开始时间</label>
                    <input value={eventStart} onChange={e => setEventStart(e.target.value)} placeholder="2026-07-01T19:00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">结束时间</label>
                    <input value={eventEnd} onChange={e => setEventEnd(e.target.value)} placeholder="2026-07-01T22:00"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">地点</label>
                  <input value={eventLocation} onChange={e => setEventLocation(e.target.value)} placeholder="活动地点"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">活动描述</label>
                  <textarea value={eventDesc} onChange={e => setEventDesc(e.target.value)} rows={2} placeholder="活动详情"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 右侧：JSON-LD 代码 */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 sticky top-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-800">📋 生成的 JSON-LD</h3>
              <button onClick={handleCopy}
                className="px-3 py-1.5 text-xs bg-primary-600 text-white rounded-md hover:bg-primary-700">
                {copied ? '✓ 已复制' : '一键复制（含script标签）'}
              </button>
            </div>
            <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs font-mono overflow-x-auto whitespace-pre-wrap max-h-[600px] overflow-y-auto">
              {code}
            </pre>
            <p className="text-xs text-gray-500 mt-3">💡 将代码粘贴到 HTML 的 &lt;head&gt; 中，访问 <a href="https://search.google.com/test/rich-results" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Google 富文本测试</a> 验证。</p>
          </div>
        </div>
      </div>

      <RelatedTools current="schema-generator" />
    </div>
  )
}
