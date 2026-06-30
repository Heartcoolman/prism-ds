package io.github.heartcoolman.prism.sample

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import io.github.heartcoolman.prism.charts.PrismBarChart
import io.github.heartcoolman.prism.charts.PrismBarDatum
import io.github.heartcoolman.prism.charts.PrismLineChart
import io.github.heartcoolman.prism.charts.PrismProgressRing
import io.github.heartcoolman.prism.charts.PrismRingTone
import io.github.heartcoolman.prism.core.PrismTheme
import io.github.heartcoolman.prism.glass.MaterialThickness
import io.github.heartcoolman.prism.glass.PrismLiquidGlass
import io.github.heartcoolman.prism.glass.PrismMaterial
import io.github.heartcoolman.prism.icons.PrismIcon
import io.github.heartcoolman.prism.icons.PrismIcons
import io.github.heartcoolman.prism.ui.PrismAlert
import io.github.heartcoolman.prism.ui.PrismAvatar
import io.github.heartcoolman.prism.ui.PrismAvatarGroup
import io.github.heartcoolman.prism.ui.PrismBadge
import io.github.heartcoolman.prism.ui.PrismBanner
import io.github.heartcoolman.prism.ui.PrismBreadcrumb
import io.github.heartcoolman.prism.ui.PrismBreadcrumbItem
import io.github.heartcoolman.prism.ui.PrismButton
import io.github.heartcoolman.prism.ui.PrismButtonVariant
import io.github.heartcoolman.prism.ui.PrismCard
import io.github.heartcoolman.prism.ui.PrismCardDescription
import io.github.heartcoolman.prism.ui.PrismCardEyebrow
import io.github.heartcoolman.prism.ui.PrismCardTitle
import io.github.heartcoolman.prism.ui.PrismCheckbox
import io.github.heartcoolman.prism.ui.PrismDate
import io.github.heartcoolman.prism.ui.PrismDatePicker
import io.github.heartcoolman.prism.ui.PrismDisclosure
import io.github.heartcoolman.prism.ui.PrismGrid
import io.github.heartcoolman.prism.ui.PrismImage
import io.github.heartcoolman.prism.ui.PrismList
import io.github.heartcoolman.prism.ui.PrismListRow
import io.github.heartcoolman.prism.ui.PrismMenu
import io.github.heartcoolman.prism.ui.PrismMenuItem
import io.github.heartcoolman.prism.ui.PrismMenuSeparator
import io.github.heartcoolman.prism.ui.PrismModal
import io.github.heartcoolman.prism.ui.PrismNavBar
import io.github.heartcoolman.prism.ui.PrismPageControl
import io.github.heartcoolman.prism.ui.PrismPopover
import io.github.heartcoolman.prism.ui.PrismProgressBar
import io.github.heartcoolman.prism.ui.PrismRadio
import io.github.heartcoolman.prism.ui.PrismRadioGroup
import io.github.heartcoolman.prism.ui.PrismRadioOption
import io.github.heartcoolman.prism.ui.PrismSearchField
import io.github.heartcoolman.prism.ui.PrismSegmentedControl
import io.github.heartcoolman.prism.ui.PrismSegmentedOption
import io.github.heartcoolman.prism.ui.PrismSelect
import io.github.heartcoolman.prism.ui.PrismSheet
import io.github.heartcoolman.prism.ui.PrismSkeleton
import io.github.heartcoolman.prism.ui.PrismSlider
import io.github.heartcoolman.prism.ui.PrismSpinner
import io.github.heartcoolman.prism.ui.PrismStateVariant
import io.github.heartcoolman.prism.ui.PrismStateView
import io.github.heartcoolman.prism.ui.PrismStepper
import io.github.heartcoolman.prism.ui.PrismSwitch
import io.github.heartcoolman.prism.ui.PrismTabBar
import io.github.heartcoolman.prism.ui.PrismTabBarItem
import io.github.heartcoolman.prism.ui.PrismTabItem
import io.github.heartcoolman.prism.ui.PrismTable
import io.github.heartcoolman.prism.ui.PrismTableColumn
import io.github.heartcoolman.prism.ui.PrismTabs
import io.github.heartcoolman.prism.ui.PrismTag
import io.github.heartcoolman.prism.ui.PrismTextField
import io.github.heartcoolman.prism.ui.PrismTextarea
import io.github.heartcoolman.prism.ui.PrismToast
import io.github.heartcoolman.prism.ui.PrismToastVariant
import io.github.heartcoolman.prism.ui.PrismTone
import io.github.heartcoolman.prism.ui.PrismTooltip
import io.github.heartcoolman.prism.ui.PrismWheelPicker

/**
 * Gallery — instantiates every public Prism* component once, proving the API
 * surface is callable. Assumes it runs inside a PrismTheme.
 */
@Composable
fun Gallery() {
    var switchOn by remember { mutableStateOf(true) }
    var checked by remember { mutableStateOf(true) }
    var radioOn by remember { mutableStateOf(true) }
    var radioGroup by remember { mutableStateOf("a") }
    var slider by remember { mutableStateOf(0.4f) }
    var stepper by remember { mutableStateOf(2) }
    var text by remember { mutableStateOf("") }
    var textarea by remember { mutableStateOf("") }
    var search by remember { mutableStateOf("") }
    var select by remember { mutableStateOf("Apple") }
    var tab by remember { mutableStateOf("one") }
    var segment by remember { mutableStateOf("day") }
    var tabBar by remember { mutableStateOf("home") }
    var wheel by remember { mutableStateOf(1) }
    var date by remember { mutableStateOf<PrismDate?>(PrismDate(2026, 6, 30)) }
    var modalOpen by remember { mutableStateOf(false) }
    var alertOpen by remember { mutableStateOf(false) }
    var popoverOpen by remember { mutableStateOf(false) }
    var sheetOpen by remember { mutableStateOf(false) }
    var menuOpen by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .verticalScroll(rememberScrollState())
            .padding(PrismTheme.spacing.s5),
        verticalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s4),
    ) {
        Text("Prism Gallery", style = PrismTheme.typography.largeTitle)

        // --- Buttons ---
        Row(horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2)) {
            PrismButton(onClick = {}, variant = PrismButtonVariant.Filled, tone = PrismTone.Accent) { Text("Filled") }
            PrismButton(onClick = {}, variant = PrismButtonVariant.Outline, tone = PrismTone.Neutral) { Text("Outline") }
        }

        // --- Icon ---
        PrismIcon(PrismIcons.Star, contentDescription = "star", size = 24.dp)

        // --- Card ---
        PrismCard(onClick = {}) {
            PrismCardEyebrow("DESIGN SYSTEM")
            PrismCardTitle("Prism Card")
            PrismCardDescription("Eyebrow + title + description slots.")
        }

        // --- Badge / Tag ---
        Row(horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2)) {
            PrismBadge(count = 5, tone = PrismTone.Danger)
            PrismBadge(dot = true, tone = PrismTone.Success)
            PrismTag("Tag", selected = true, onClick = {}, onRemove = {})
        }

        // --- Feedback ---
        PrismSpinner()
        PrismProgressBar(progress = 0.6f)
        PrismSkeleton(height = 16.dp)
        PrismPageControl(count = 4, activeIndex = 1)
        PrismBanner(title = "Heads up", message = "Inline banner.", tone = PrismTone.Warning)
        PrismToast(text = "Saved", variant = PrismToastVariant.Success)

        // --- Toggles ---
        PrismSwitch(checked = switchOn, onCheckedChange = { switchOn = it }, label = "Switch")
        PrismCheckbox(checked = checked, onCheckedChange = { checked = it }, label = "Checkbox")
        PrismRadio(selected = radioOn, onClick = { radioOn = !radioOn }, label = "Radio")
        PrismRadioGroup(
            value = radioGroup,
            onValueChange = { radioGroup = it },
            options = listOf(
                PrismRadioOption(value = "a", label = "Option A"),
                PrismRadioOption(value = "b", label = "Option B"),
            ),
        )

        // --- Inputs ---
        PrismSlider(value = slider, onValueChange = { slider = it }, label = "Slider", showValue = true)
        PrismStepper(value = stepper, onValueChange = { stepper = it }, min = 0, max = 10)
        PrismTextField(value = text, onValueChange = { text = it }, label = "Text field", placeholder = "Type…")
        PrismTextarea(value = textarea, onValueChange = { textarea = it }, label = "Textarea", minLines = 3)
        PrismSearchField(value = search, onValueChange = { search = it }, onClear = { search = "" })
        PrismSelect(
            value = select,
            onValueChange = { select = it },
            options = listOf("Apple", "Banana", "Cherry"),
            label = "Select",
        )

        // --- Navigation ---
        PrismTabs(
            tabs = listOf(PrismTabItem("one", "One"), PrismTabItem("two", "Two")),
            value = tab,
            onChange = { tab = it },
        )
        PrismSegmentedControl(
            options = listOf(PrismSegmentedOption("day", "Day"), PrismSegmentedOption("week", "Week")),
            value = segment,
            onChange = { segment = it },
        )
        PrismTabBar(
            items = listOf(
                PrismTabBarItem("home", "Home") { PrismIcon(PrismIcons.Home, contentDescription = null, size = 24.dp) },
                PrismTabBarItem("me", "Me") { PrismIcon(PrismIcons.User, contentDescription = null, size = 24.dp) },
            ),
            value = tabBar,
            onChange = { tabBar = it },
        )
        PrismNavBar(title = "Title", onBack = {}, trailing = { PrismIcon(PrismIcons.More, contentDescription = null) })
        PrismBreadcrumb(
            items = listOf(PrismBreadcrumbItem("Home"), PrismBreadcrumbItem("Library"), PrismBreadcrumbItem("Item")),
            onNavigate = {},
        )

        // --- Disclosure ---
        PrismDisclosure(title = "Disclosure") {
            Text("Collapsible content.")
        }

        // --- List ---
        PrismList {
            PrismListRow(
                title = "Row one",
                subtitle = "Subtitle",
                leading = { PrismIcon(PrismIcons.Star, contentDescription = null, size = 20.dp) },
                chevron = true,
                onClick = {},
            )
            PrismListRow(title = "Row two", trailing = { Text("Detail") }, showDivider = false)
        }

        // --- Table ---
        PrismTable(
            columns = listOf(
                PrismTableColumn(key = "name", header = "Name"),
                PrismTableColumn(key = "qty", header = "Qty", numeric = true),
            ),
            rows = listOf(
                mapOf("name" to "Apples", "qty" to "12"),
                mapOf("name" to "Pears", "qty" to "7"),
            ),
            caption = "Inventory",
        )

        // --- Grid ---
        PrismGrid(items = listOf("A", "B", "C", "D"), columns = 2) { item ->
            Text(item)
        }

        // --- Avatars ---
        Row(horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s3)) {
            PrismAvatar(name = "Jane Doe", online = true)
            PrismAvatarGroup(names = listOf("Al", "Bo", "Cy", "Di"), max = 3)
        }

        // --- Image ---
        PrismImage(overlay = true) {
            Text("Caption")
        }

        // --- State view ---
        PrismStateView(
            title = "No items",
            variant = PrismStateVariant.Empty,
            description = "Nothing here yet.",
            action = { PrismButton(onClick = {}) { Text("Add") } },
        )

        // --- Date / Wheel pickers ---
        PrismDatePicker(value = date, onChange = { date = it }, today = PrismDate(2026, 6, 30))
        PrismWheelPicker(
            options = listOf("Sun", "Mon", "Tue", "Wed", "Thu"),
            selectedIndex = wheel,
            onSelectedChange = { wheel = it },
        )

        // --- Charts ---
        PrismBarChart(
            data = listOf(PrismBarDatum("Mon", 3f), PrismBarDatum("Tue", 6f), PrismBarDatum("Wed", 4f)),
            showValues = true,
        )
        PrismLineChart(data = listOf(3f, 5f, 2f, 8f, 6f), area = true)
        PrismProgressRing(value = 72f, tone = PrismRingTone.Success, label = "72%")

        // --- Glass ---
        PrismMaterial(thickness = MaterialThickness.Regular) {
            Text("Material", modifier = Modifier.padding(PrismTheme.spacing.s4))
        }
        PrismLiquidGlass(pill = true) {
            Text("Liquid glass", modifier = Modifier.padding(PrismTheme.spacing.s4))
        }

        // --- Overlays (driven by toggles so they compile) ---
        Row(horizontalArrangement = Arrangement.spacedBy(PrismTheme.spacing.s2)) {
            PrismButton(onClick = { modalOpen = true }) { Text("Modal") }
            PrismButton(onClick = { alertOpen = true }) { Text("Alert") }
            PrismButton(onClick = { sheetOpen = true }) { Text("Sheet") }
        }

        PrismModal(
            open = modalOpen,
            onClose = { modalOpen = false },
            title = "Modal",
            actions = { PrismButton(onClick = { modalOpen = false }) { Text("OK") } },
            content = { Text("Modal body") },
        )
        PrismAlert(
            open = alertOpen,
            onClose = { alertOpen = false },
            title = "Delete?",
            message = "This cannot be undone.",
            destructive = true,
            onConfirm = { alertOpen = false },
        )
        PrismSheet(open = sheetOpen, onClose = { sheetOpen = false }, title = "Sheet") {
            Text("Sheet body")
        }

        // Popover anchors its trigger; content floats when open.
        PrismPopover(
            open = popoverOpen,
            onClose = { popoverOpen = false },
            content = { Text("Popover body") },
        ) {
            PrismButton(onClick = { popoverOpen = true }) { Text("Popover") }
        }

        // Tooltip wraps its trigger.
        PrismTooltip(label = "Tooltip", open = false) {
            PrismButton(onClick = {}) { Text("Tooltip") }
        }

        // Menu anchored inside a Box with its trigger.
        Box {
            PrismButton(onClick = { menuOpen = true }) { Text("Menu") }
            PrismMenu(
                expanded = menuOpen,
                onDismissRequest = { menuOpen = false },
                items = listOf(
                    PrismMenuItem(label = "Edit", icon = { PrismIcon(PrismIcons.Edit, contentDescription = null, size = 18.dp) }),
                    PrismMenuSeparator,
                    PrismMenuItem(label = "Delete", danger = true),
                ),
            )
        }
    }
}
