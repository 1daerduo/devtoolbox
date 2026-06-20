'use client'

import { useState, useMemo, useCallback } from 'react'
import Breadcrumb from '@/components/Breadcrumb'
import RelatedTools from '@/components/RelatedTools'

const EMOJI_DATA: { category: string; emojis: { char: string; name: string; keywords: string }[] }[] = [
  { category: '😀 笑脸', emojis: [
    { char: '😀', name: 'Grinning Face', keywords: '笑 开心 脸 smile' },
    { char: '😂', name: 'Face with Tears of Joy', keywords: '笑哭 大笑 眼泪 laugh' },
    { char: '🤣', name: 'Rolling on Floor', keywords: '笑滚 搞笑 rofl' },
    { char: '😍', name: 'Heart Eyes', keywords: '喜欢 爱心 爱 love heart' },
    { char: '😎', name: 'Cool', keywords: '墨镜 酷 sunglasses cool' },
    { char: '🤩', name: 'Star-Struck', keywords: '星星眼 兴奋 star excited' },
    { char: '😊', name: 'Smiling Face', keywords: '微笑 开心 温暖 smile blush' },
    { char: '😢', name: 'Crying Face', keywords: '哭泣 难过 眼泪 cry sad' },
    { char: '😡', name: 'Pouting Face', keywords: '生气 愤怒 angry mad rage' },
    { char: '😱', name: 'Screaming in Fear', keywords: '惊恐 尖叫 害怕 scream fear' },
    { char: '🤔', name: 'Thinking Face', keywords: '思考 疑问 think hmm' },
    { char: '😴', name: 'Sleeping Face', keywords: '睡觉 困 sleep zzz' },
    { char: '🥳', name: 'Partying Face', keywords: '庆祝 派对 party celebrate' },
    { char: '😇', name: 'Smiling with Halo', keywords: '天使 无辜 angel innocent' },
    { char: '🤗', name: 'Hugging Face', keywords: '拥抱 欢迎 hug welcome' },
  ]},
  { category: '👍 手势', emojis: [
    { char: '👍', name: 'Thumbs Up', keywords: '点赞 好 同意 like ok' },
    { char: '👎', name: 'Thumbs Down', keywords: '踩 不好 反对 dislike no' },
    { char: '👏', name: 'Clapping', keywords: '鼓掌 拍手 clap applaud' },
    { char: '🙌', name: 'Raising Hands', keywords: '举手 庆祝 hallelujah celebrate' },
    { char: '🤝', name: 'Handshake', keywords: '握手 合作 协议 handshake deal' },
    { char: '💪', name: 'Flexed Biceps', keywords: '肌肉 力量 加油 strong flex' },
    { char: '✌️', name: 'Victory Hand', keywords: '胜利 耶 peace victory' },
    { char: '🤞', name: 'Crossed Fingers', keywords: '祈祷 好运 luck fingers' },
    { char: '👌', name: 'OK Hand', keywords: '好的 完美 ok perfect' },
    { char: '🤙', name: 'Call Me', keywords: '打电话 call phone shaka' },
  ]},
  { category: '❤️ 心形', emojis: [
    { char: '❤️', name: 'Red Heart', keywords: '爱心 喜欢 爱 love heart red' },
    { char: '🧡', name: 'Orange Heart', keywords: '橙色爱心 orange heart' },
    { char: '💛', name: 'Yellow Heart', keywords: '黄色爱心 yellow heart' },
    { char: '💚', name: 'Green Heart', keywords: '绿色爱心 green heart' },
    { char: '💙', name: 'Blue Heart', keywords: '蓝色爱心 blue heart' },
    { char: '💜', name: 'Purple Heart', keywords: '紫色爱心 purple heart' },
    { char: '🖤', name: 'Black Heart', keywords: '黑色爱心 black heart dark' },
    { char: '🤍', name: 'White Heart', keywords: '白色爱心 white heart' },
    { char: '💕', name: 'Two Hearts', keywords: '双心 恋爱 two hearts love' },
    { char: '💖', name: 'Sparkling Heart', keywords: '闪耀爱心 sparkling heart' },
    { char: '💘', name: 'Heart with Arrow', keywords: '爱心之箭 丘比特 cupid arrow' },
    { char: '💝', name: 'Heart with Ribbon', keywords: '爱心礼物 丝带 gift ribbon' },
  ]},
  { category: '🎉 庆祝', emojis: [
    { char: '🎉', name: 'Party Popper', keywords: '庆祝 派对 撒花 party celebrate' },
    { char: '🎊', name: 'Confetti Ball', keywords: '彩纸 庆祝 confetti' },
    { char: '🎂', name: 'Birthday Cake', keywords: '生日 蛋糕 birthday cake' },
    { char: '🎈', name: 'Balloon', keywords: '气球 庆祝 balloon' },
    { char: '🎁', name: 'Gift', keywords: '礼物 惊喜 gift present' },
    { char: '🏆', name: 'Trophy', keywords: '奖杯 冠军 胜利 trophy win' },
    { char: '🥇', name: 'Gold Medal', keywords: '金牌 第一 gold first medal' },
    { char: '🌟', name: 'Glowing Star', keywords: '星星 闪耀 优秀 star glow' },
    { char: '🔥', name: 'Fire', keywords: '火 热门 火爆 fire hot lit' },
    { char: '💯', name: 'Hundred Points', keywords: '一百分 完美 满分 100 perfect' },
  ]},
  { category: '💻 科技', emojis: [
    { char: '💻', name: 'Laptop', keywords: '电脑 笔记本 laptop computer' },
    { char: '🖥️', name: 'Desktop', keywords: '台式机 电脑 desktop monitor' },
    { char: '⌨️', name: 'Keyboard', keywords: '键盘 keyboard type' },
    { char: '🖱️', name: 'Mouse', keywords: '鼠标 mouse click' },
    { char: '📱', name: 'Mobile Phone', keywords: '手机 mobile phone smartphone' },
    { char: '💡', name: 'Light Bulb', keywords: '灯泡 想法 创意 idea light bulb' },
    { char: '🔍', name: 'Magnifying Glass', keywords: '搜索 放大镜 查找 search zoom' },
    { char: '🔒', name: 'Lock', keywords: '锁 安全 加密 lock security' },
    { char: '🔑', name: 'Key', keywords: '钥匙 密码 key password' },
    { char: '⚙️', name: 'Gear', keywords: '齿轮 设置 配置 gear settings config' },
    { char: '🛠️', name: 'Tools', keywords: '工具 修理 tools wrench fix' },
    { char: '📊', name: 'Bar Chart', keywords: '图表 数据 统计 chart bar data' },
    { char: '📈', name: 'Chart Increasing', keywords: '上升 增长 趋势 up trend growth' },
    { char: '🤖', name: 'Robot', keywords: '机器人 AI robot bot' },
    { char: '🧠', name: 'Brain', keywords: '大脑 智能 思考 brain smart ai' },
  ]},
  { category: '📝 符号', emojis: [
    { char: '✅', name: 'Check Mark', keywords: '勾选 完成 确认 check done ok' },
    { char: '❌', name: 'Cross Mark', keywords: '错误 取消 删除 cross x no' },
    { char: '⚠️', name: 'Warning', keywords: '警告 注意 warning alert caution' },
    { char: '🚀', name: 'Rocket', keywords: '火箭 启动 快速 rocket launch deploy' },
    { char: '💥', name: 'Collision', keywords: '爆炸 碰撞 冲击 boom explosion' },
    { char: '✨', name: 'Sparkles', keywords: '闪烁 魔法 新 sparkles magic new' },
    { char: '📌', name: 'Pushpin', keywords: '图钉 固定 置顶 pin pushpin' },
    { char: '🔗', name: 'Link', keywords: '链接 连接 link chain' },
    { char: '📎', name: 'Paperclip', keywords: '回形针 附件 attach paperclip' },
    { char: '🗑️', name: 'Wastebasket', keywords: '垃圾桶 删除 trash delete bin' },
    { char: '➕', name: 'Plus', keywords: '加号 新增 添加 plus add' },
    { char: '➖', name: 'Minus', keywords: '减号 删除 减少 minus remove' },
    { char: '💬', name: 'Speech Balloon', keywords: '对话 评论 聊天 comment chat speech' },
    { char: '👀', name: 'Eyes', keywords: '眼睛 关注 查看 eyes look watch' },
    { char: '🎯', name: 'Bullseye', keywords: '目标 精准 命中 target goal bullseye' },
  ]},
]

export default function ToolClient() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('')
  const [copied, setCopied] = useState('')
  const [copyFormat, setCopyFormat] = useState<'char' | 'html' | 'css'>('char')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    let all = EMOJI_DATA
    if (activeCat) all = all.filter(c => c.category === activeCat)
    if (!q) return all
    return all.map(c => ({
      ...c,
      emojis: c.emojis.filter(e => e.name.toLowerCase().includes(q) || e.keywords.includes(q))
    })).filter(c => c.emojis.length > 0)
  }, [search, activeCat])

  const copyEmoji = useCallback(async (emoji: { char: string; name: string }) => {
    let text = emoji.char
    if (copyFormat === 'html') text = `&#x${emoji.char.codePointAt(0)?.toString(16)};`
    else if (copyFormat === 'css') text = `\\${emoji.char.codePointAt(0)?.toString(16).toUpperCase().padStart(4, '0')}`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(emoji.name)
      setTimeout(() => setCopied(''), 1500)
    } catch {
      setCopied(emoji.name)
      setTimeout(() => setCopied(''), 1500)
    }
  }, [copyFormat])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumb items={[{ label: '首页', href: '/' }, { label: 'Emoji 选择器' }]} />
      <h1 className="text-3xl font-bold mt-4 mb-2">Emoji 选择器 | Emoji Picker</h1>
      <p className="text-gray-600 mb-6">浏览、搜索并复制 Emoji 表情符号</p>

      <div className="flex gap-3 mb-4 flex-wrap items-center">
        <input value={search} onChange={(e) => { setSearch(e.target.value); setActiveCat('') }}
          className="border rounded-lg px-4 py-2 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="搜索 Emoji..." />
        <select value={copyFormat} onChange={(e) => setCopyFormat(e.target.value as typeof copyFormat)}
          className="border rounded px-3 py-2 text-sm">
          <option value="char">字符</option>
          <option value="html">HTML 实体</option>
          <option value="css">CSS 代码</option>
        </select>
        {copied && <span className="text-sm text-green-600 animate-pulse">已复制: {copied}</span>}
        {!search && (
          <button onClick={() => setActiveCat('')}
            className={`px-3 py-1 text-xs rounded-full ${!activeCat ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}>
            全部
          </button>
        )}
      </div>

      {!search && !activeCat && (
        <div className="flex gap-2 mb-4 flex-wrap">
          {EMOJI_DATA.map((cat) => (
            <button key={cat.category} onClick={() => { setActiveCat(cat.category); setSearch('') }}
              className="px-3 py-1 text-xs bg-gray-100 rounded-full hover:bg-blue-50 hover:text-blue-700 transition-colors">
              {cat.category}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-6 mb-4">
        {filtered.map((cat) => (
          <div key={cat.category}>
            <h2 className="text-sm font-medium text-gray-500 mb-2">{cat.category}</h2>
            <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-15 gap-1">
              {cat.emojis.map((emoji) => (
                <button key={emoji.name} onClick={() => copyEmoji(emoji)}
                  className="text-2xl p-2 rounded hover:bg-blue-50 hover:scale-125 transition-all cursor-pointer text-center"
                  title={`${emoji.name} — ${emoji.keywords}`}>
                  {emoji.char}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          没有找到匹配的 Emoji
        </div>
      )}

      <RelatedTools current="emoji-picker" />
    </div>
  )
}
