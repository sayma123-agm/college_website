/* ==========================================================================
   AGMRCET Placements Dashboard Charts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const packageTrendCtx = document.getElementById('packageTrendChart');
    const branchPlacementCtx = document.getElementById('branchPlacementChart');

    // Read theme styles for Chart configurations
    const getChartThemeColors = () => {
        const isDark = document.documentElement.classList.contains('dark-theme');
        return {
            gridColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)',
            textColor: isDark ? '#9ca3af' : '#6c757d',
            primaryColor: '#0f2b5c',
            secondaryColor: '#0088cc',
            accentColor: '#d4af37',
            successColor: '#10b981',
            textMain: isDark ? '#f3f4f6' : '#2b303a'
        };
    };

    let themeColors = getChartThemeColors();

    // 1. Line/Bar Chart: Salary Package Trends (2021-2025)
    let packageTrendChart;
    if (packageTrendCtx) {
        packageTrendChart = new Chart(packageTrendCtx, {
            type: 'line',
            data: {
                labels: ['2021', '2022', '2023', '2024', '2025'],
                datasets: [
                    {
                        label: 'Highest Package (LPA)',
                        data: [7.5, 8.4, 9.6, 10.5, 12.0],
                        borderColor: '#d4af37',
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#d4af37',
                        pointRadius: 5,
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Average Package (LPA)',
                        data: [3.8, 4.1, 4.3, 4.5, 4.8],
                        borderColor: '#0088cc',
                        backgroundColor: 'rgba(0, 136, 204, 0.1)',
                        borderWidth: 3,
                        pointBackgroundColor: '#0088cc',
                        pointRadius: 5,
                        tension: 0.3,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: themeColors.textMain,
                            font: { family: 'Inter', size: 12 }
                        }
                    },
                    tooltip: {
                        padding: 10,
                        backgroundColor: 'rgba(15, 43, 92, 0.9)'
                    }
                },
                scales: {
                    x: {
                        grid: { color: themeColors.gridColor },
                        ticks: { color: themeColors.textColor }
                    },
                    y: {
                        grid: { color: themeColors.gridColor },
                        ticks: { color: themeColors.textColor },
                        title: {
                            display: true,
                            text: 'Package value (LPA)',
                            color: themeColors.textColor
                        }
                    }
                }
            }
        });
    }

    // 2. Bar Chart: Branch-Wise Placement Rate (%)
    let branchPlacementChart;
    if (branchPlacementCtx) {
        branchPlacementChart = new Chart(branchPlacementCtx, {
            type: 'bar',
            data: {
                labels: ['CSE', 'CSE-AIML', 'CSD', 'ECE', 'EEE', 'Mechanical', 'Civil', 'MBA', 'MCA'],
                datasets: [{
                    label: 'Placement rate (%)',
                    data: [92, 95, 90, 88, 85, 82, 80, 90, 94],
                    backgroundColor: [
                        '#0f2b5c', '#0088cc', '#d4af37', '#10b981', 
                        '#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899', '#14b8a6'
                    ],
                    borderRadius: 6,
                    maxBarThickness: 35
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        padding: 10,
                        backgroundColor: 'rgba(15, 43, 92, 0.9)'
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: themeColors.textColor }
                    },
                    y: {
                        grid: { color: themeColors.gridColor },
                        ticks: { color: themeColors.textColor },
                        min: 0,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Recruitment rate (%)',
                            color: themeColors.textColor
                        }
                    }
                }
            }
        });
    }

    // Listen to theme switches and re-configure charts
    const observer = new MutationObserver(() => {
        themeColors = getChartThemeColors();

        if (packageTrendChart) {
            packageTrendChart.options.plugins.legend.labels.color = themeColors.textMain;
            packageTrendChart.options.scales.x.grid.color = themeColors.gridColor;
            packageTrendChart.options.scales.x.ticks.color = themeColors.textColor;
            packageTrendChart.options.scales.y.grid.color = themeColors.gridColor;
            packageTrendChart.options.scales.y.ticks.color = themeColors.textColor;
            packageTrendChart.options.scales.y.title.color = themeColors.textColor;
            packageTrendChart.update();
        }

        if (branchPlacementChart) {
            branchPlacementChart.options.scales.x.ticks.color = themeColors.textColor;
            branchPlacementChart.options.scales.y.grid.color = themeColors.gridColor;
            branchPlacementChart.options.scales.y.ticks.color = themeColors.textColor;
            branchPlacementChart.options.scales.y.title.color = themeColors.textColor;
            branchPlacementChart.update();
        }
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
});
