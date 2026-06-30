import { useState, useRef, useMemo } from "react";
import { createRoot } from "react-dom/client";
import {
  ThemeProvider, apple, neutral, themeToVars,
  Alert, Avatar, AvatarGroup, Badge, Banner, BarChart, Breadcrumb, Button,
  Card, Checkbox, DatePicker, Disclosure, Grid, Icon, Image, LineChart,
  LiquidGlass, List, ListRow, Material, Menu, Modal, NavBar, PageControl,
  Popover, ProgressBar, ProgressRing, Radio, RadioGroup, SearchField,
  SegmentedControl, Select, Sheet, Skeleton, Slider, Spinner, StateView,
  Stepper, Switch, TabBar, Table, Tabs, Tag, TextField, Textarea, Toast,
  Tooltip, WheelPicker, icons,
} from "../dist/index.js";

/* ---------------- 布局辅助组件 ---------------- */
function Section({ id, eyebrow, title, desc, children }) {
  return (
    <section id={id} className="demo-section">
      <header className="demo-section-head">
        {eyebrow && <span className="text-footnote text-accent" style={{ fontWeight: 600, letterSpacing: "0.05em" }}>{eyebrow}</span>}
        <h2 className="text-title-1" style={{ margin: 0 }}>{title}</h2>
        {desc && <p className="text-subhead text-secondary" style={{ margin: 0, maxWidth: "64ch" }}>{desc}</p>}
      </header>
      {children}
    </section>
  );
}

function Block({ title, api, children, col }) {
  return (
    <div className="demo-block">
      <div className="demo-block-title">
        <span className="text-headline">{title}</span>
        {api && <code>{api}</code>}
      </div>
      <div className={"demo-canvas" + (col ? " col" : "")}>{children}</div>
    </div>
  );
}

const Row = ({ children, top }) => <div className={"demo-wrap" + (top ? " top" : "")}>{children}</div>;
const ic = (name, size = 18) => <Icon name={name} size={size} />;

/* ---------------- 基础令牌数据 ---------------- */
const SEMANTIC_COLORS = [
  ["--color-accent", "强调色"], ["--color-success", "成功"],
  ["--color-warning", "警告"], ["--color-danger", "危险"],
  ["--label-primary", "主文本"], ["--label-secondary", "次文本"],
  ["--label-tertiary", "三级文本"], ["--bg", "背景"],
  ["--bg-elevated", "悬浮背景"], ["--fill-tertiary", "三级填充"],
  ["--tint-accent-bg", "强调底色"], ["--separator-opaque", "分隔线"],
];
const TYPE_SCALE = [
  ["text-large-title", "大标题", "700 · 34/1.1"],
  ["text-title-1", "标题 1", "640 · 28/1.15"],
  ["text-title-2", "标题 2", "600 · 22/1.2"],
  ["text-headline", "醒目标题", "600 · 17/1.3"],
  ["text-body", "正文", "400 · 17/1.5"],
  ["text-subhead", "副文", "400 · 15/1.45"],
  ["text-footnote", "脚注", "400 · 13/1.4"],
];
const SPACE = [["--s-1", 4], ["--s-2", 8], ["--s-3", 12], ["--s-4", 16], ["--s-5", 24], ["--s-6", 32], ["--s-7", 64]];
const RADII = ["--radius-sm", "--radius-input", "--radius-image", "--radius-card", "--radius-modal", "--radius-pill"];
const SHADOWS = ["--shadow-1", "--shadow-2", "--shadow-3", "--shadow-4", "--shadow-card"];
const ICON_NAMES = Object.keys(icons);

/* ---------------- 各组件独立的有状态演示 ---------------- */
function ButtonsDemo() {
  return (
    <div className="stack" style={{ width: "100%" }}>
      <Row>
        <Button variant="filled">实心</Button>
        <Button variant="tinted">浅色</Button>
        <Button variant="gray">灰色</Button>
        <Button variant="bordered">描边</Button>
        <Button variant="plain">无底</Button>
      </Row>
      <Row>
        <Button size="small">小</Button>
        <Button size="medium">中</Button>
        <Button size="large">大</Button>
        <Button leadingIcon={ic("download")}>前置图标</Button>
        <Button trailingIcon={ic("chevronRight")}>后置图标</Button>
      </Row>
      <Row>
        <Button tone="accent">强调</Button>
        <Button tone="success" variant="tinted">成功</Button>
        <Button tone="danger" variant="filled">危险</Button>
        <Button disabled>禁用</Button>
      </Row>
      <Button fullWidth variant="filled" leadingIcon={ic("check")}>通栏主操作</Button>
    </div>
  );
}

function SegmentedDemo() {
  const [v, setV] = useState("day");
  return (
    <div className="stack" style={{ width: "100%" }}>
      <SegmentedControl value={v} onChange={setV} options={[
        { label: "日", value: "day" }, { label: "周", value: "week" }, { label: "月", value: "month" },
      ]} />
      <SegmentedControl size="small" fullWidth value={v} onChange={setV} options={[
        { label: "日", value: "day" }, { label: "周", value: "week" }, { label: "月", value: "month" },
      ]} />
    </div>
  );
}

function StepperDemo() {
  const [n, setN] = useState(2);
  return <Stepper value={n} onChange={setN} min={0} max={10} />;
}

function SwitchDemo() {
  const [a, setA] = useState(true);
  const [b, setB] = useState(false);
  return (
    <Row>
      <Switch checked={a} onChange={(e) => setA(e.target.checked)} label="无线局域网" />
      <Switch checked={b} onChange={(e) => setB(e.target.checked)} label="飞行模式" />
      <Switch checked disabled label="已锁定" />
    </Row>
  );
}

function CheckboxDemo() {
  const [set, setSet] = useState({ a: true, b: false });
  return (
    <div className="stack-sm">
      <Checkbox label="订阅更新" checked={set.a} onChange={(e) => setSet({ ...set, a: e.target.checked })} />
      <Checkbox label="后台同步" checked={set.b} onChange={(e) => setSet({ ...set, b: e.target.checked })} />
      <Checkbox label="中间态（混合）" indeterminate />
      <Checkbox label="禁用" disabled />
    </div>
  );
}

function RadioDemo() {
  const [v, setV] = useState("standard");
  return (
    <div className="stack-sm">
      <RadioGroup name="ship" value={v} onChange={setV} options={[
        { label: "标准 — 5 天", value: "standard" },
        { label: "加急 — 2 天", value: "express" },
        { label: "次日达", value: "overnight" },
        { label: "自提（暂不可用）", value: "pickup", disabled: true },
      ]} />
      <div className="row" style={{ gap: 20, paddingTop: 4, borderTop: "1px solid var(--separator)" }}>
        <span className="text-footnote text-tertiary">独立 &lt;Radio&gt;：</span>
        <Radio name="standalone" defaultChecked label="甲" />
        <Radio name="standalone" label="乙" />
      </div>
    </div>
  );
}

function SliderDemo() {
  const [v, setV] = useState(60);
  return <div style={{ width: "100%", maxWidth: 360 }}><Slider label="亮度" showValue min={0} max={100} value={v} onChange={(e) => setV(+e.target.value)} /></div>;
}

function SearchDemo() {
  const [v, setV] = useState("");
  return <div style={{ width: "100%", maxWidth: 360 }}><SearchField fullWidth placeholder="搜索" value={v} onChange={(e) => setV(e.target.value)} onClear={() => setV("")} /></div>;
}

function FieldsDemo() {
  return (
    <Grid columns={2} gap={16} style={{ width: "100%" }}>
      <TextField label="邮箱" placeholder="you@example.com" leadingIcon={ic("mail")} helpText="我们绝不会泄露。" />
      <TextField label="密码" type="password" error="至少 8 个字符" defaultValue="123" />
      <Select label="国家 / 地区" defaultValue="cn">
        <option value="cn">中国</option>
        <option value="us">美国</option>
        <option value="jp">日本</option>
      </Select>
      <TextField label="禁用" placeholder="只读" disabled />
      <div style={{ gridColumn: "1 / -1" }}>
        <Textarea label="备注" fullWidth placeholder="补充说明…" helpText="支持 Markdown。" rows={3} />
      </div>
    </Grid>
  );
}

function DateDemo() {
  const [d, setD] = useState(new Date(2026, 5, 30));
  return (
    <Row top>
      <DatePicker value={d} onChange={setD} defaultMonth={new Date(2026, 5, 1)} />
      <span className="text-subhead text-secondary">已选：{d ? d.toLocaleDateString("zh-CN") : "—"}</span>
    </Row>
  );
}

function WheelDemo() {
  const [cols, setCols] = useState([
    { key: "h", value: "09", options: ["07", "08", "09", "10", "11", "12"].map((x) => ({ label: x, value: x })) },
    { key: "m", value: "30", options: ["00", "15", "30", "45"].map((x) => ({ label: x, value: x })) },
    { key: "ap", value: "AM", options: [{ label: "上午", value: "AM" }, { label: "下午", value: "PM" }] },
  ]);
  return (
    <WheelPicker columns={cols} onChange={(i, val) => setCols((c) => c.map((col, idx) => (idx === i ? { ...col, value: val } : col)))} />
  );
}

function TagsDemo() {
  const [sel, setSel] = useState("设计");
  const [tags, setTags] = useState(["Swift", "React", "Figma"]);
  return (
    <div className="stack">
      <Row>
        <Tag tone="gray">灰色</Tag>
        <Tag tone="accent">强调</Tag>
        <Tag tone="success">成功</Tag>
        <Tag tone="warning">警告</Tag>
        <Tag tone="danger">危险</Tag>
      </Row>
      <Row>
        {["设计", "编码", "发布"].map((t) => (
          <Tag key={t} selected={sel === t} onClick={() => setSel(t)}>{t}</Tag>
        ))}
      </Row>
      <Row>
        {tags.map((t) => <Tag key={t} tone="accent" onRemove={() => setTags((x) => x.filter((y) => y !== t))}>{t}</Tag>)}
      </Row>
    </div>
  );
}

function BadgesDemo() {
  return (
    <Row>
      <Badge count={3} />
      <Badge count={128} max={99} tone="accent" />
      <Badge dot tone="danger" />
      <Badge count={5} tone="danger"><span style={{ color: "var(--label-primary)" }}>{ic("bell", 26)}</span></Badge>
      <Badge dot><span style={{ color: "var(--label-primary)" }}>{ic("mail", 26)}</span></Badge>
    </Row>
  );
}

function AvatarsDemo() {
  return (
    <div className="stack">
      <Row>
        <Avatar name="李 雷" size="small" />
        <Avatar name="韩 梅" size="medium" status="online" />
        <Avatar src="https://i.pravatar.cc/120?img=12" name="Linus" size="large" />
        <Avatar name="无名" size="large" status="online" />
      </Row>
      <AvatarGroup max={3}>
        <Avatar name="甲" /><Avatar name="乙" /><Avatar name="丙" /><Avatar name="丁" /><Avatar name="戊" />
      </AvatarGroup>
    </div>
  );
}

function CardsDemo() {
  return (
    <Grid columns={3} gap={16} style={{ width: "100%" }}>
      <Card eyebrow="指南" title="用令牌做设计" description="原子 → 语义 → 组件三层令牌，让品牌切换只需改一行。"
        footer={<Button variant="plain" trailingIcon={ic("arrowRight")}>阅读</Button>} />
      <Card interactive media={<Image ratio="16:9" src="https://picsum.photos/seed/prism/400/240" alt="" />}
        eyebrow="精选" title="液态玻璃" description="一种漂浮在界面之上的半透明材质。" />
      <Card title="自由内容" description="卡片可在文本块下方放置任意子节点。">
        <Row><Tag tone="accent">新</Tag><Tag>测试版</Tag></Row>
      </Card>
    </Grid>
  );
}

function ListsDemo() {
  return (
    <div style={{ width: "100%", maxWidth: 460 }}>
      <List>
        <ListRow leading={<Avatar name="张 敏" size="small" />} title="张敏" subtitle="产品设计师" trailing={ic("chevronRight")} onClick={() => {}} />
        <ListRow leading={<span className="text-accent">{ic("bell", 22)}</span>} title="通知" trailing={<Switch defaultChecked />} />
        <ListRow leading={<span className="text-accent">{ic("lock", 22)}</span>} title="隐私" subtitle="面容 ID、密码" chevron onClick={() => {}} />
        <ListRow title="版本" trailing={<span className="text-secondary tabular-nums">1.0.0</span>} />
      </List>
    </div>
  );
}

function TableDemo() {
  return (
    <div style={{ width: "100%" }}>
      <Table caption="季度营收"
        columns={[
          { key: "team", header: "团队" },
          { key: "q1", header: "Q1", numeric: true },
          { key: "q2", header: "Q2", numeric: true },
          { key: "delta", header: "环比", align: "right" },
        ]}
        rows={[
          { team: "平台", q1: "¥1.2M", q2: "¥1.6M", delta: <Tag tone="success">+33%</Tag> },
          { team: "增长", q1: "¥0.8M", q2: "¥0.7M", delta: <Tag tone="danger">−12%</Tag> },
          { team: "设计", q1: "¥0.3M", q2: "¥0.5M", delta: <Tag tone="success">+66%</Tag> },
        ]} />
    </div>
  );
}

function ChartsDemo() {
  return (
    <Row top>
      <div className="stack-sm"><span className="text-footnote text-secondary">柱状图</span>
        <BarChart height={120} showValues data={[
          { label: "周一", value: 32 }, { label: "周二", value: 48 }, { label: "周三", value: 40 },
          { label: "周四", value: 64 }, { label: "周五", value: 52 },
        ]} />
      </div>
      <div className="stack-sm"><span className="text-footnote text-secondary">折线图 · 面积</span>
        <LineChart area width={240} height={120} data={[12, 18, 14, 26, 22, 34, 30, 42]} />
      </div>
      <div className="stack-sm"><span className="text-footnote text-secondary">折线图</span>
        <LineChart width={240} height={120} data={[40, 22, 30, 18, 26, 14, 20, 8]} />
      </div>
    </Row>
  );
}

function ImagesDemo() {
  return (
    <Row top>
      <div style={{ width: 200 }}><Image ratio="16:9" src="https://picsum.photos/seed/a/400/240" alt="" overlay><span className="text-headline" style={{ color: "#fff" }}>16:9 + 蒙层</span></Image></div>
      <div style={{ width: 140 }}><Image ratio="1:1" src="https://picsum.photos/seed/b/300/300" alt="" /></div>
      <div style={{ width: 140 }}><Image ratio="3:4" /></div>
    </Row>
  );
}

function TooltipDemo() {
  return (
    <Row>
      <Tooltip label="上方" placement="top"><Button variant="gray">悬停（上）</Button></Tooltip>
      <Tooltip label="右侧" placement="right"><Button variant="gray">右侧</Button></Tooltip>
      <Tooltip label="始终可见" open><Button variant="bordered">强制展开</Button></Tooltip>
    </Row>
  );
}

function BannersDemo() {
  const [open, setOpen] = useState(true);
  return (
    <div className="stack" style={{ width: "100%" }}>
      <Banner tone="info" title="提示">有新版本可用。</Banner>
      <Banner tone="success" title="已保存" action={<Button size="small" variant="tinted" tone="success">查看</Button>}>你的更改已生效。</Banner>
      <Banner tone="warning" title="存储即将占满">你已使用套餐的 92%。</Banner>
      {open && <Banner tone="danger" title="支付失败" onClose={() => setOpen(false)}>请更新银行卡以继续。</Banner>}
    </div>
  );
}

function AlertDemo() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(false);
  return (
    <Row>
      <Button variant="bordered" onClick={() => setA(true)}>打开警示</Button>
      <Button variant="bordered" tone="danger" onClick={() => setB(true)}>危险操作</Button>
      <Alert open={a} onClose={() => setA(false)} onConfirm={() => setA(false)} title="允许定位？" message="我们用它为你展示附近的结果。" confirmLabel="允许" cancelLabel="暂不" />
      <Alert open={b} onClose={() => setB(false)} onConfirm={() => setB(false)} destructive stacked title="删除项目？" message="此操作无法撤销。" confirmLabel="删除" cancelLabel="取消" />
    </Row>
  );
}

function ToastDemo() {
  return (
    <div className="stack-sm">
      <Toast open variant="neutral" message="链接已复制到剪贴板" />
      <Toast open variant="success" message="资料已更新" />
      <Toast open variant="error" message="连接失败" />
    </div>
  );
}

function ProgressDemo() {
  const [v, setV] = useState(40);
  return (
    <div className="stack" style={{ width: "100%" }}>
      <div style={{ maxWidth: 360 }} className="stack-sm">
        <ProgressBar value={v} />
        <ProgressBar value={80} tone="success" />
        <ProgressBar indeterminate />
        <Row><Button size="small" variant="gray" onClick={() => setV((x) => Math.max(0, x - 10))}>−10</Button>
          <Button size="small" variant="gray" onClick={() => setV((x) => Math.min(100, x + 10))}>+10</Button></Row>
      </div>
      <Row>
        <ProgressRing value={v} />
        <ProgressRing value={72} tone="success" size={56} />
        <ProgressRing value={33} tone="danger" size={56} label={ic("heart", 20)} />
      </Row>
    </div>
  );
}

function LoadingDemo() {
  return (
    <div className="stack" style={{ width: "100%" }}>
      <Row>
        <Spinner size="small" /><Spinner size="medium" /><Spinner size="large" />
        <Spinner showLabel label="加载中…" />
      </Row>
      <Row top>
        <div style={{ width: 220 }} className="stack-sm">
          <Skeleton variant="text" lines={3} />
          <Row><Skeleton variant="circle" width={40} height={40} /><Skeleton variant="rect" width={140} height={40} /></Row>
        </div>
      </Row>
    </div>
  );
}

function StateViewDemo() {
  return (
    <Grid columns={2} gap={16} style={{ width: "100%" }}>
      <div className="demo-canvas col"><StateView variant="empty" title="暂无消息" description="收件箱已清空。" action={<Button variant="tinted">写邮件</Button>} /></div>
      <div className="demo-canvas col"><StateView variant="error" title="出了点问题" description="请稍后重试。" action={<Button variant="bordered" leadingIcon={ic("refresh")}>重试</Button>} /></div>
    </Grid>
  );
}

function NavBarDemo() {
  return (
    <Row top>
      <div className="demo-device">
        <NavBar title="收件箱" onBack={() => {}} backLabel="返回" trailing={<span className="text-accent">{ic("edit", 22)}</span>} />
        <div className="demo-device-scroll">
          <p className="text-subhead text-secondary" style={{ margin: 0 }}>标准三栏布局，半透明材质背景。</p>
        </div>
      </div>
      <div className="demo-device">
        <NavBar large title="资源库" trailing={<span className="text-accent">{ic("more", 22)}</span>} />
        <div className="demo-device-scroll">
          <p className="text-subhead text-secondary" style={{ margin: 0 }}>大标题变体。</p>
        </div>
      </div>
    </Row>
  );
}

function TabBarDemo() {
  const [t, setT] = useState("home");
  const LABELS = { home: "首页", search: "搜索", alerts: "通知", me: "我的" };
  return (
    <div className="demo-device">
      <div className="demo-device-scroll"><span className="text-title-2">{LABELS[t]}</span></div>
      <TabBar value={t} onChange={setT} items={[
        { key: "home", label: "首页", icon: ic("home", 24) },
        { key: "search", label: "搜索", icon: ic("search", 24) },
        { key: "alerts", label: "通知", icon: ic("bell", 24) },
        { key: "me", label: "我的", icon: ic("user", 24) },
      ]} />
    </div>
  );
}

function TabsDemo() {
  const [t, setT] = useState("overview");
  const LABELS = { overview: "概览", specs: "参数", reviews: "评价" };
  return (
    <div className="stack" style={{ width: "100%" }}>
      <Tabs value={t} onChange={setT} tabs={[
        { key: "overview", label: "概览" }, { key: "specs", label: "参数" }, { key: "reviews", label: "评价" },
      ]} />
      <Tabs fullWidth value={t} onChange={setT} tabs={[
        { key: "overview", label: "概览" }, { key: "specs", label: "参数" }, { key: "reviews", label: "评价" },
      ]} />
      <p className="text-subhead text-secondary" style={{ margin: 0 }}>当前选项卡：{LABELS[t]}</p>
    </div>
  );
}

function BreadcrumbDemo() {
  return (
    <Breadcrumb onNavigate={() => {}} items={[
      { label: "首页" }, { label: "资源库" }, { label: "组件" }, { label: "面包屑" },
    ]} />
  );
}

function PageControlDemo() {
  const [i, setI] = useState(1);
  return <PageControl count={5} index={i} onChange={setI} />;
}

function MenuDemo() {
  return (
    <div style={{ width: 240 }}>
      <Menu open items={[
        { label: "分享", icon: ic("share") },
        { label: "复制副本", icon: ic("folder") },
        { label: "编辑", icon: ic("edit") },
        "separator",
        { label: "删除", icon: ic("trash"), danger: true },
        { label: "归档（禁用）", disabled: true },
      ]} />
    </div>
  );
}

function DisclosureDemo() {
  return (
    <div style={{ width: "100%", maxWidth: 460 }} className="stack-sm">
      <Disclosure title="什么是 Prism？" defaultOpen>一套可换肤的 React 设计系统，由 46 个令牌驱动的组件组成。</Disclosure>
      <Disclosure title="主题定制如何工作？">每个品牌相关取值都是一个 CSS 变量，通过 ThemeProvider 的 <code>theme</code> 属性覆盖即可。</Disclosure>
    </div>
  );
}

function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="bordered" onClick={() => setOpen(true)}>打开模态框</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="订阅"
        actions={<><Button variant="gray" onClick={() => setOpen(false)}>取消</Button><Button variant="filled" onClick={() => setOpen(false)}>确认</Button></>}>
        <p className="text-body" style={{ margin: 0 }}>在收件箱接收产品更新，随时可退订。</p>
        <div style={{ marginTop: 12 }}><TextField fullWidth label="邮箱" placeholder="you@example.com" /></div>
      </Modal>
    </>
  );
}

function SheetDemo() {
  const [open, setOpen] = useState(false);
  const ACTIONS = [["mail", "邮件"], ["share", "分享"], ["bookmark", "收藏"], ["download", "下载"]];
  return (
    <>
      <Button variant="bordered" onClick={() => setOpen(true)}>打开底部弹层</Button>
      <Sheet open={open} onClose={() => setOpen(false)} title="分享到">
        <Grid columns={4} gap={12}>
          {ACTIONS.map(([n, label]) => (
            <div key={n} className="stack-sm" style={{ alignItems: "center" }}>
              <span className="text-accent">{ic(n, 26)}</span>
              <span className="text-footnote text-secondary">{label}</span>
            </div>
          ))}
        </Grid>
        <div style={{ marginTop: 16 }}><Button fullWidth variant="gray" onClick={() => setOpen(false)}>取消</Button></div>
      </Sheet>
    </>
  );
}

function PopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="demo-popover-stage">
      <Popover open={open} onClose={() => setOpen(false)} placement="bottom"
        content={<div style={{ maxWidth: 200 }}><b className="text-headline">筛选</b><p className="text-subhead text-secondary" style={{ margin: "6px 0 0" }}>带指示箭头的锚定卡片。</p></div>}>
        <Button variant="bordered" trailingIcon={ic("chevronDown")} onClick={() => setOpen((o) => !o)}>切换气泡卡</Button>
      </Popover>
    </div>
  );
}

function MaterialDemo() {
  const thick = [["ultraThin", "超薄"], ["thin", "薄"], ["regular", "常规"], ["thick", "厚"]];
  return (
    <div style={{ width: "100%" }} className="stack">
      <div className="demo-photobg">
        {thick.map(([t, label]) => (
          <Material key={t} thickness={t} style={{ padding: "14px 18px", borderRadius: 14 }}>
            <span className="text-subhead" style={{ fontWeight: 600 }}>{label}</span>
          </Material>
        ))}
        <Material progressive style={{ padding: "14px 18px", borderRadius: 14 }}>
          <span className="text-subhead" style={{ fontWeight: 600 }}>渐隐</span>
        </Material>
      </div>
    </div>
  );
}

function LiquidGlassDemo() {
  return (
    <div className="demo-photobg" style={{ flexDirection: "column", alignItems: "center", gap: 20 }}>
      <LiquidGlass pill>
        <div className="row" style={{ padding: "8px 10px", gap: 6 }}>
          <Button size="small" variant="plain" style={{ color: "#fff" }} leadingIcon={ic("arrowLeft")} />
          <Button size="small" variant="plain" style={{ color: "#fff" }} leadingIcon={ic("play")} />
          <Button size="small" variant="plain" style={{ color: "#fff" }} leadingIcon={ic("arrowRight")} />
        </div>
      </LiquidGlass>
      <LiquidGlass style={{ padding: 18, maxWidth: 280 }}>
        <span className="text-headline" style={{ color: "#fff" }}>液态玻璃（2025）</span>
        <p className="text-subhead" style={{ margin: "6px 0 0", color: "rgba(255,255,255,.85)" }}>一种会折射其后内容的动态材质，仅用于漂浮的控件层。</p>
      </LiquidGlass>
    </div>
  );
}

/* ---------------- 主题面板 ---------------- */
const VIOLET = {
  accent: "#7c3aed", accentHover: "#6d28d9", accentPressed: "#5b21b6",
  success: "#15803d", warning: "#b45309", danger: "#dc2626",
  radiusCard: "14px", radiusPill: "12px", radiusInput: "10px",
  focusRing: "0 0 0 3px rgba(124,58,237,0.4)",
};
const PRESETS = { apple, neutral, violet: VIOLET };
const PRESET_CN = { apple: "苹果", neutral: "中性", violet: "紫罗兰", custom: "自定义" };

function ThemingPanel({ preset, theme }) {
  const vars = themeToVars(theme);
  return (
    <div className="stack" style={{ width: "100%" }}>
      <p className="text-subhead text-secondary" style={{ margin: 0 }}>
        顶部控制栏会为整页实时切换 <code>ThemeProvider</code>。
        当前预设 <b>{PRESET_CN[preset]}</b> 经 <code>themeToVars()</code> 解析为以下内联 CSS 变量：
      </p>
      <pre style={{ margin: 0, padding: "var(--s-4)", background: "var(--fill-tertiary)", borderRadius: "var(--radius-input)", overflow: "auto", fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 1.6 }}>
{Object.entries(vars).map(([k, v]) => `${k}: ${v};`).join("\n") || "/* 默认苹果预设 — 无覆盖 */"}
      </pre>
    </div>
  );
}

/* ---------------- 应用主体 ---------------- */
const NAV = [
  ["基础", [["colors", "颜色"], ["type", "字体排版"], ["space", "间距"], ["radius", "圆角"], ["elevation", "阴影"], ["icons", "图标"]]],
  ["操作与输入", [["buttons", "按钮"], ["selection", "选择控件"], ["forms", "表单字段"], ["pickers", "选择器"]]],
  ["数据展示", [["tags", "标签与徽章"], ["avatars", "头像"], ["cards", "卡片"], ["lists", "列表"], ["table", "表格"], ["charts", "图表"], ["media", "媒体"]]],
  ["反馈", [["banners", "横幅与警示"], ["toasts", "轻提示"], ["progress", "进度"], ["loading", "加载"], ["states", "状态视图"]]],
  ["导航", [["navbar", "导航栏与标签栏"], ["tabs", "选项卡"], ["misc-nav", "面包屑·分页·菜单"], ["disclosure", "折叠面板"]]],
  ["浮层", [["overlays", "模态·底部弹层·气泡卡"]]],
  ["材质", [["materials", "材质与液态玻璃"]]],
  ["主题", [["theming", "主题定制"]]],
];

function App() {
  const [scheme, setScheme] = useState(() => (typeof window !== "undefined" && window.__PRISM_SCHEME__) || "light");
  const [preset, setPreset] = useState(() => (typeof window !== "undefined" && window.__PRISM_PRESET__) || "apple");
  const [accent, setAccent] = useState("");

  const theme = useMemo(() => {
    const base = PRESETS[preset];
    if (!accent) return base;
    return { ...base, accent, accentHover: accent, accentPressed: accent, focusRing: `0 0 0 3px ${accent}66` };
  }, [preset, accent]);

  return (
    <ThemeProvider colorScheme={scheme} theme={theme} className="demo-root">
      <Material thickness="thin" className="demo-header">
        <div className="demo-header-inner">
          <div className="demo-brand"><span className="demo-brand-mark" /> Prism</div>
          <div className="demo-controls">
            <SegmentedControl size="small" value={preset} onChange={(p) => { setPreset(p); setAccent(""); }} options={[
              { label: "苹果", value: "apple" }, { label: "中性", value: "neutral" }, { label: "紫罗兰", value: "violet" },
            ]} />
            <label className="row" title="自定义强调色">
              <input className="demo-accent-input" type="color" value={accent || "#0066cc"} onChange={(e) => setAccent(e.target.value)} />
            </label>
            <Switch checked={scheme === "dark"} onChange={(e) => setScheme(e.target.checked ? "dark" : "light")} label="深色" />
          </div>
        </div>
      </Material>

      <div className="demo-shell">
        <nav className="demo-nav">
          {NAV.map(([group, items]) => (
            <div key={group}>
              <div className="demo-nav-group">{group}</div>
              {items.map(([id, label]) => <a key={id} href={"#" + id}>{label}</a>)}
            </div>
          ))}
        </nav>

        <main className="demo-content">
          <div className="demo-hero">
            <span className="text-footnote text-accent" style={{ fontWeight: 600, letterSpacing: "0.06em" }}>@prism-ds/react · v1.0.0</span>
            <h1 className="text-large-title" style={{ margin: 0 }}>Prism 设计系统</h1>
            <p className="text-body text-secondary">一套可换肤的 React + TypeScript 设计系统。46 个组件完全由 CSS 变量令牌驱动（原子 → 语义 → 组件），内置苹果风格默认主题。切换上方控制栏，所有组件会同时换肤。</p>
            <div className="demo-stat-row">
              <div className="demo-stat"><b>46</b><span className="text-footnote text-secondary">组件</span></div>
              <div className="demo-stat"><b>3</b><span className="text-footnote text-secondary">主题</span></div>
              <div className="demo-stat"><b>{ICON_NAMES.length}</b><span className="text-footnote text-secondary">图标</span></div>
              <div className="demo-stat"><b>2</b><span className="text-footnote text-secondary">配色方案</span></div>
            </div>
          </div>

          {/* ---------------- 基础 ---------------- */}
          <Section id="colors" eyebrow="基础" title="颜色" desc="语义令牌叠加在中性原子色阶之上。色板读取实时 CSS 变量，因此会跟随当前主题与配色方案变化。">
            <div className="demo-swatches">
              {SEMANTIC_COLORS.map(([v, name]) => (
                <div className="demo-swatch" key={v}>
                  <div className="demo-swatch-chip" style={{ background: `var(${v})` }} />
                  <div className="demo-swatch-meta"><div className="n">{name}</div><div className="v">{v}</div></div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="type" title="字体排版" desc="基于系统字体栈（SF Pro / 苹方）的 7 级字阶，以工具类形式暴露。">
            <Block title="字阶">
              <div style={{ width: "100%" }}>
                {TYPE_SCALE.map(([cls, name, spec]) => (
                  <div className="demo-type-row" key={cls}>
                    <span className={cls}>{name}</span>
                    <span className="spec">.{cls} · {spec}</span>
                  </div>
                ))}
              </div>
            </Block>
          </Section>

          <Section id="space" title="间距" desc="以 4 为基数、8pt 为节奏的间距阶——从图标紧贴间隙到主区块的大留白。">
            <Block title="间距阶">
              <div className="stack-sm" style={{ width: "100%" }}>
                {SPACE.map(([v, px]) => (
                  <div className="demo-space-row" key={v}>
                    <code style={{ width: 56, fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--label-tertiary)" }}>{v}</code>
                    <div className="demo-space-bar" style={{ width: `var(${v})` }} />
                    <span className="text-footnote text-secondary">{px}px</span>
                  </div>
                ))}
              </div>
            </Block>
          </Section>

          <Section id="radius" title="圆角与阴影" desc="同心圆角体系与 5 级阴影阶。">
            <Block title="圆角">
              <div className="demo-radius-grid">
                {RADII.map((v) => <div className="demo-radius-box" key={v} style={{ borderRadius: `var(${v})` }}>{v.replace("--radius-", "")}</div>)}
              </div>
            </Block>
            <Block title="阴影" api="--shadow-*">
              <div className="demo-shadow-grid" id="elevation">
                {SHADOWS.map((v) => <div className="demo-shadow-box" key={v} style={{ boxShadow: `var(${v})` }}>{v.replace("--shadow-", "shadow ")}</div>)}
              </div>
            </Block>
          </Section>

          <Section id="icons" title="图标" desc={`一套 ${ICON_NAMES.length} 个字形的统一图标集，绘制于 24px 关键线网格、2px 描边，继承 currentColor。`}>
            <div className="demo-icon-grid">
              {ICON_NAMES.map((n) => (
                <div className="demo-icon-cell" key={n}><Icon name={n} size={24} /><span>{n}</span></div>
              ))}
            </div>
          </Section>

          {/* ---------------- 操作与输入 ---------------- */}
          <Section id="buttons" eyebrow="组件" title="按钮" desc="层级由填充强度表达：实心 > 浅色 > 灰色 > 描边 > 无底。每个区域只用一个实心主操作；最小点击区 44px。">
            <Block title="变体、尺寸、色调" api="<Button />"><ButtonsDemo /></Block>
          </Section>

          <Section id="selection" title="选择控件" desc="分段控件、步进器、开关、勾选框、单选组与滑块。">
            <Block title="分段控件" api="<SegmentedControl />"><SegmentedDemo /></Block>
            <Block title="步进器与开关"><Row top><StepperDemo /><SwitchDemo /></Row></Block>
            <Block title="勾选框与单选组"><Row top style={{ gap: 48 }}><CheckboxDemo /><RadioDemo /></Row></Block>
            <Block title="滑块" api="<Slider />"><SliderDemo /></Block>
          </Section>

          <Section id="forms" title="表单字段" desc="带帮助 / 错误状态、前置图标与通栏布局的带标签输入框。">
            <Block title="文本框 · 下拉 · 多行文本"><FieldsDemo /></Block>
            <Block title="搜索框" api="<SearchField />"><SearchDemo /></Block>
          </Section>

          <Section id="pickers" title="选择器" desc="自包含的日历与滚轮选择器——不依赖任何日期库。">
            <Block title="日期选择器" api="<DatePicker />"><DateDemo /></Block>
            <Block title="滚轮选择器" api="<WheelPicker />"><WheelDemo /></Block>
          </Section>

          {/* ---------------- 数据展示 ---------------- */}
          <Section id="tags" eyebrow="组件" title="标签与徽章" desc="用于标记与筛选的紧凑药丸；用于通知的数字 / 圆点徽章。">
            <Block title="标签" api="<Tag />"><TagsDemo /></Block>
            <Block title="徽章" api="<Badge />"><BadgesDemo /></Block>
          </Section>

          <Section id="avatars" title="头像" desc="照片或首字母回退、在线状态点，以及溢出分组。">
            <Block title="头像与头像组"><AvatarsDemo /></Block>
          </Section>

          <Section id="cards" title="卡片" desc="一块中性表面，可选顶部媒体、眉标 / 标题 / 描述与页脚。">
            <Block title="卡片" api="<Card />"><CardsDemo /></Block>
          </Section>

          <Section id="lists" title="列表" desc="带前置槽、副标题、尾部控件与展开箭头的分组行。">
            <Block title="列表与列表行"><ListsDemo /></Block>
          </Section>

          <Section id="table" title="表格" desc="脚注字重的表头叠加正文行；数字列右对齐并使用等宽数字。">
            <Block title="表格" api="<Table />"><TableDemo /></Block>
          </Section>

          <Section id="charts" title="图表" desc="克制、无坐标轴的柱状与趋势折线图，仅用单一强调色。">
            <Block title="柱状图与折线图"><ChartsDemo /></Block>
          </Section>

          <Section id="media" title="媒体与布局" desc="固定宽高比的媒体框（可选渐变蒙层），以及响应式 Grid。">
            <Block title="图片" api="<Image />"><ImagesDemo /></Block>
            <Block title="栅格" api="<Grid />">
              <Grid style={{ width: "100%" }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ background: "var(--fill-tertiary)", borderRadius: "var(--radius-input)", padding: "var(--s-4)", textAlign: "center" }} className="text-subhead text-secondary">单元 {i + 1}</div>
                ))}
              </Grid>
            </Block>
            <Block title="气泡提示" api="<Tooltip />"><TooltipDemo /></Block>
          </Section>

          {/* ---------------- 反馈 ---------------- */}
          <Section id="banners" eyebrow="组件" title="横幅与警示" desc="行内着色横幅与居中确认对话框。">
            <Block title="横幅" api="<Banner />"><BannersDemo /></Block>
            <Block title="警示框" api="<Alert />"><AlertDemo /></Block>
          </Section>

          <Section id="toasts" title="轻提示" desc="简短的纯展示反馈卡片，带可选的着色前置图标。">
            <Block title="轻提示" api="<Toast />"><ToastDemo /></Block>
          </Section>

          <Section id="progress" title="进度" desc="线性条与环形进度，可确定或不确定，提供三种色调。">
            <Block title="进度条与进度环"><ProgressDemo /></Block>
          </Section>

          <Section id="loading" title="加载" desc="活动指示器与脉动的骨架占位。">
            <Block title="加载指示器与骨架屏"><LoadingDemo /></Block>
          </Section>

          <Section id="states" title="状态视图" desc="整页的空 / 加载 / 错误 / 成功状态范式。">
            <Block title="状态视图" api="<StateView />"><StateViewDemo /></Block>
          </Section>

          {/* ---------------- 导航 ---------------- */}
          <Section id="navbar" eyebrow="组件" title="导航栏与标签栏" desc="建立在材质表面之上的半透明顶部导航与底部标签栏。">
            <Block title="导航栏" api="<NavBar />"><NavBarDemo /></Block>
            <Block title="标签栏" api="<TabBar />"><TabBarDemo /></Block>
          </Section>

          <Section id="tabs" title="选项卡" desc="带动画强调下划线的选项卡，支持键盘操作。">
            <Block title="选项卡" api="<Tabs />"><TabsDemo /></Block>
          </Section>

          <Section id="misc-nav" title="面包屑 · 分页 · 菜单" desc="路径导航、页点指示器与下拉菜单。">
            <Block title="面包屑" api="<Breadcrumb />"><BreadcrumbDemo /></Block>
            <Block title="分页点" api="<PageControl />"><PageControlDemo /></Block>
            <Block title="菜单" api="<Menu />"><MenuDemo /></Block>
          </Section>

          <Section id="disclosure" title="折叠面板" desc="折叠摘要行，通过旋转的箭头展开内容。">
            <Block title="折叠面板" api="<Disclosure />"><DisclosureDemo /></Block>
          </Section>

          {/* ---------------- 浮层 ---------------- */}
          <Section id="overlays" eyebrow="组件" title="浮层" desc="模态对话框、底部弹层与锚定气泡卡——均可按 Escape / 点击遮罩关闭。">
            <Block title="模态框 · 底部弹层 · 气泡卡"><Row><ModalDemo /><SheetDemo /></Row></Block>
            <Block title="气泡卡" api="<Popover />"><PopoverDemo /></Block>
          </Section>

          {/* ---------------- 材质 ---------------- */}
          <Section id="materials" eyebrow="标志特性" title="材质与液态玻璃" desc="用于漂浮界面的磨砂玻璃表面，以及用于控件层的 2025 液态玻璃材质。">
            <Block title="材质" api="<Material thickness | progressive />"><MaterialDemo /></Block>
            <Block title="液态玻璃" api="<LiquidGlass pill />"><LiquidGlassDemo /></Block>
          </Section>

          {/* ---------------- 主题 ---------------- */}
          <Section id="theming" eyebrow="特性" title="主题定制" desc="品牌相关取值都是带合理默认值的 CSS 变量。把 Theme 传给 ThemeProvider，整个子树即刻换肤。">
            <Block title="实时令牌" api="themeToVars(theme)"><ThemingPanel preset={accent ? "custom" : preset} theme={theme} /></Block>
          </Section>

          <footer className="text-footnote text-tertiary" style={{ paddingTop: "var(--s-6)", borderTop: "1px solid var(--separator)" }}>
            基于 @prism-ds/react 构建 · MIT。以上每个取值都源自设计令牌——没有任何硬编码的品牌色。
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
}

export { App };

if (typeof document !== "undefined") {
  createRoot(document.getElementById("root")).render(<App />);
}
